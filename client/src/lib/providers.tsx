"use client";

import * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import queryClient from "./query-client";
// import Hydration from "./query-hydration";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  //   const router = useRouter();
  // const [queryClient] = React.useState(() => new QueryClient());

  return (
    <NextThemesProvider {...themeProps}>
      <QueryClientProvider client={queryClient}>
        {/* <Hydration> */}
        <ReactQueryDevtools initialIsOpen={true} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
        {/* </Hydration> */}
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
