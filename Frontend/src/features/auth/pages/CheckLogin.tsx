import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import storage from "utils/storage";
import { CREDS_KEY, getCreds } from "../api";
import { queryClient } from "lib/react-query";

const CheckLogin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function handleLogin() {
    const token = searchParams.get("token");
    if (!token) {
      return navigate("/login");
    }

    storage.setToken(token);
    const { creds } = await getCreds();
    queryClient.setQueryData([CREDS_KEY], { creds });

    navigate("/");
  }

  useEffect(() => {
    handleLogin();
  }, [searchParams]);

  return <></>;
};

export default CheckLogin;
