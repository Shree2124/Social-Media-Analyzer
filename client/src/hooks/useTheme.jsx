import { useSelector } from "react-redux";

const useTheme = () => {
  const theme = useSelector((state) => state);
  console.log(theme);
  return theme;
};

export default useTheme;
