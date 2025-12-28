import { useEffect } from "react";
import API from "../../api/axios"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router";

const Logout = () => {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function logoutUser() {
      await API.get("/user/logout");
      setUser(null);
    }
    logoutUser();
  }, [setUser]);
  return (
    <>
    {!user && navigate('/')}
    </>
  );
}

export default Logout;