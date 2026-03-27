import { Card } from "@mantine/core";
import { LoginForm } from "../components";

const Login: React.FC = () => {
  return (
    <Card
      className="h-auto w-full max-w-md px-5 md:px-10 pt-5 md:pt-8 pb-7 md:pb-10 mx-5"
      shadow="sm"
      p={0}
      radius="lg"
    >
      <div className="text-center space-y-3 mb-6">
        <h1 className=" text-xl font-bold mb-3 flex flex-col items-center gap-y-3">
          <img src="./logo.png" alt="" className="h-28" /> UNIVERSITAS LAMBUNG{" "}
          <br />
          MANGKURAT
        </h1>
        <div className="text-orange-400 text-[16px] font-semibold font-['Montserrat'] tracking-[2px]">
          SISTEM INFORMASI KERJASAMA
        </div>
      </div>
      <LoginForm />
    </Card>
  );
};

export default Login;
