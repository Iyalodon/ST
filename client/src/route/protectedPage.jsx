import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    if (guestOnly && userSelector?.email) {
      return nav("/");
    } else if (needLogin && !userSelector?.email) {
      return nav("/login");
    }
  }, [userSelector, guestOnly, needLogin]);

  return children;
}
