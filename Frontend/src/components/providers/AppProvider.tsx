import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { queryClient } from "lib/react-query";
import ErrorProvider from "./ErrorProvider";

import "styles/globals.css";
import { AuthProvider } from "features/auth";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

interface Props {
  children: React.ReactNode;
}

const theme: MantineThemeOverride = {
  fontFamily: "'Montserrat', sans-serif",
  headings: {
    fontFamily: "'Montserrat', sans-serif",
  },
};

const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <ModalsProvider labels={{ confirm: "Konfirmasi", cancel: "Batal" }}>
            <Notifications autoClose={5000} />
            <AuthProvider>
              <Router>
                <HelmetProvider>{children}</HelmetProvider>
              </Router>
            </AuthProvider>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </ErrorProvider>
  );
};

export default AppProvider;
