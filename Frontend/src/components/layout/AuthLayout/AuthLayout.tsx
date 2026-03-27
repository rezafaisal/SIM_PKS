import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Center, Loader } from "@mantine/core";
import { useAuth } from "features/auth";

const LoadingScreen = () => (
  <Center className="w-full h-screen bg-body">
    <Loader color="orange" />
  </Center>
);

const AuthLayout: React.FC = () => {
  const { creds } = useAuth();

  if (creds) return <Navigate to="/" replace />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className=" bg-[url(/background-login.png)] bg-cover bg-center bg-fixed">
        <div className="h-screen flex items-center justify-center bg-black bg-opacity-70">
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};

export default AuthLayout;
