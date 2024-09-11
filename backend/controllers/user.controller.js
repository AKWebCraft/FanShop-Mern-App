const joi = require("joi");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const RefreshToken = require("../models/token.model");
const JwtServices = require("../utils/jwtServices");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const userController = {
  // USER REGISTER CONTROLLER
  async register(req, res, next) {
    const userRegisterSchema = joi.object({
      name: joi.string().min(4).max(30).required(),
      email: joi.string().email().required(),
      address: joi.string().required(),
      number: joi.number().required(),
      password: joi.string().pattern(passwordPattern).required(),
      confirmPassword: joi.ref("password"),
    });

    const { error } = userRegisterSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { name, email, address, number, password } = req.body;

    try {
      const emailInUse = await User.exists({ email: email });
      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email is already Registered",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    let accessToken;
    let refreshToken;
    let user;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const registerUser = new User({
        name: name,
        email: email,
        address: address,
        number: number,
        password: hashedPassword,
      });

      user = await registerUser.save();

      accessToken = JwtServices.signAccessToken({ _id: user._id }, "30m");
      refreshToken = JwtServices.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return next(error);
    }

    await JwtServices.storeRefreshToken(refreshToken, user._id);

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.status(201).json({ user, auth: true });
  },

  // USER LOGIN CONTROLLER
  async login(req, res, next) {
    const userLoginSchema = joi.object({
      name: joi.string().min(4).max(30).required(),
      password: joi.string().pattern(passwordPattern).required(),
    });

    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { name, password } = req.body;
    let user;
    try {
      user = await User.findOne({ name: name });
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid Name",
        };
        return next(error);
      }

      const passwordMatch = bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        const error = {
          status: 401,
          message: "Invalid Password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const accessToken = JwtServices.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JwtServices.signRefreshToken({ _id: user._id }, "60m");

    try {
      await RefreshToken.updateOne(
        { _id: user._id },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.status(200).json({ user, auth: true });
  },

  // USER LOGOUT CONTROLLER
  async logout(req, res, next) {
    const { refreshToken } = req.cookies;

    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ user: null });
  },

  // REFRESH CONTROLLER
  async refresh(req, res, next) {
    // GET REFRESH TOKEN FROM COOKIES
    const originalRefreshToken = req.cookies.refreshToken;

    let id;

    // VERIFY REFRESH TOKEN
    try {
      id = JwtServices.verifyRefreshToken(originalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    try {
      const match = RefreshToken.findOne({
        _id: id,
        token: originalRefreshToken,
      });

      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };

        return next(error);
      }
    } catch (e) {
      return next(e);
    }

    // GENERATE NEW TOKENS
    try {
      const accessToken = JwtServices.signAccessToken({ _id: id }, "30m");

      const refreshToken = JwtServices.signRefreshToken({ _id: id }, "60m");

      // UPDATING DATABASE AND SENDING RESPONSE

      await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (e) {
      return next(e);
    }

    const user = await User.findOne({ _id: id });

    return res.status(200).json({ user, auth: true });
  },

  // USER UPDATE CONTROLLER
  async update(req, res, next) {
    const userRegisterSchema = joi.object({
      name: joi.string().min(4).max(30).required(),
      email: joi.string().email().required(),
      address: joi.string().required(),
      number: joi.number().required(),
      id: joi.string().regex(mongodbIdPattern).required(),
    });

    const { error } = userRegisterSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { id, name, email, address, number } = req.body;

    let accessToken;
    let refreshToken;
    let updatedUser;
    try {
      updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          name: name,
          email: email,
          address: address,
          number: number,
        },
        { new: true }
      );

      accessToken = JwtServices.signAccessToken(
        { _id: updatedUser._id },
        "30m"
      );
      refreshToken = JwtServices.signRefreshToken(
        { _id: updatedUser._id },
        "60m"
      );
    } catch (error) {
      return next(error);
    }

    await JwtServices.storeRefreshToken(refreshToken, updatedUser._id);

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    return res.status(200).json({ updatedUser, auth: true });
  },
};

module.exports = userController;
