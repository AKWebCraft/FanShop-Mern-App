import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import axios from "axios";

function useAutoLogin() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // IIFE
    (async function autoLoginApiCall() {
      try {
        const response = await axios.get("http://localhost:5000/refresh", {
          withCredentials: true,
        });

        if (response.status === 200) {
          // 1. setUser
          const user = {
            _id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            address: response.data.user.address,
            number: response.data.user.number,
            role: response.data.user.role,
            auth: response.data.auth,
          };

          dispatch(setUser(user));
        }
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading;
}

export default useAutoLogin;
