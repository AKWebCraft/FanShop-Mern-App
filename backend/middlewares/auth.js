const User = require("../models/user.model");
const JWTServices = require("../utils/jwtServices");

const auth = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    let _id;

    try {
      _id = JWTServices.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return next(error);
    }

    let user;

    try {
      user = await User.findOne({ _id: _id });
    } catch (error) {
      return next(error);
    }

    const userDto = user;

    req.user = userDto;

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
