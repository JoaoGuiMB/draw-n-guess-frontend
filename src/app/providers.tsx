"use client";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { store } from "../redux/store";
import { wsApi } from "../redux/api";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ApiProvider api={wsApi}>
      <Provider store={store}>{children}</Provider>
    </ApiProvider>
  );
}
