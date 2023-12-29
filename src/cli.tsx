#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import App from "./app.js";

const enterAltScreenCommand = "\x1b[?1049h";
process.stdout.write(enterAltScreenCommand);

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
