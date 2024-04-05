import { createBrowserRouter } from "react-router-dom";
import CollectionPage from "./pages/collection_page";
import SubjectPage from "./pages/subject_page";
import OverviewPage from "./pages/overview_page";
import { DefaultLayout } from "./pages/layout";
import LoginPage from "./pages/login_page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <CollectionPage /> }, // '/user/:id'
      {
        path: "/subject/:id",
        element: <SubjectPage />,
        children: [{ index: true, element: <OverviewPage /> }],
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ],
  },
]);

export default router;
