import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RootElement, {
  loader as rootLoader,
  action as rootAction,
} from "./RootElement";
import Movie, { loader as movieLoader } from "./Movie";
import EditMovie, { action as editAction } from "./EditMovie";
import { action as destroyAction } from "./Destroy";
import Index from "./index";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootElement />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Index /> },
            {
              path: "/movies/:id",
              element: <Movie />,
              loader: movieLoader as any,
            },
            {
              path: "/movies/:id/edit",
              element: <EditMovie />,
              loader: movieLoader as any,
              action: editAction as any,
            },
            {
              path: "/movies/:id/destroy",
              action: destroyAction as any,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
