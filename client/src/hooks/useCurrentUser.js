import { useSelector } from "react-redux";

const useCurrentUser = () => {
  console.log(
    "current user hook ",
    useSelector((state) => state.auth.user ?? null)
  );
  return useSelector((state) => state.auth.user ?? null);
};

export default useCurrentUser;
