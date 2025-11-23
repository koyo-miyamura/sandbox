import { createBrowserRouter } from "react-router";
import App from './App.tsx'
import About from './About.tsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  }
]);
