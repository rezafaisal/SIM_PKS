import { Center, Loader } from "@mantine/core";

const LoadingScreen: React.FC = () => {
  return (
    <Center className="w-full h-full">
      <Loader color="orange" />
    </Center>
  );
};

export default LoadingScreen;
