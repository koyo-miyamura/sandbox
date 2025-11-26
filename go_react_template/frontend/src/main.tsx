import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { RouterProvider } from "react-router/dom";
import { router } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
