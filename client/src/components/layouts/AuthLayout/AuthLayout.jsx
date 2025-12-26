import { CircularProgress } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../../store/slices/authSlice";

const AuthLayout = ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, loading } = useSelector((state) => state.auth);
  const [isReady, setIsReady] = useState(true);

  useLayoutEffect(() => {
    dispatch(fetchUser);
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (auth) {
        setIsReady(true);
      } else {
        navigate("/");
      }
    }
  }, [auth, loading, navigate]);

  if (loading || !isReady) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f4f4f4]">
        <CircularProgress
          sx={{
            color: "#ff8f07",
          }}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
