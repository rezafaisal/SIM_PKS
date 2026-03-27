import { Center, Loader } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { logout, useCreds } from "../api";
import { AuthContext } from "../contexts";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useCreds();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value = useMemo(
    () => ({
      creds: data || undefined,
      isLoading,
      logout: logoutMutation.mutateAsync,
    }),
    [data, logoutMutation.mutateAsync, isLoading]
  );

  if (isLoading || logoutMutation.isLoading)
    return (
      <Center className="w-full h-screen bg-body">
        <Loader color="orange" />
      </Center>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
