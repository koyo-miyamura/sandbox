import { createBrowserRouter } from "react-router";
import Layout from './Layout.tsx';
import Home from './Home.tsx'
import About from './About.tsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      }
    ]
  }
]);
