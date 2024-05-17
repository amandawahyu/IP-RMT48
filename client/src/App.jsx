import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import FavoritePage from "./pages/FavoritePage";

const router = createBrowserRouter([
  {
      element: <MainLayout />,

      children: [
          {
              path: "/",
              element: <HomePage />,
          },
          {
              path: "/detail/:id",
              element: <DetailPage />,
          },
          {
              path: "/favorite",
              element: <FavoritePage />,
          },
      ],
  },
  {
      path: "/register",
      element: <RegisterPage />,
      loader: () => {
          if (localStorage.token) {
              return redirect("/");
          }
          return null;
      },
  },
  {
      path: "/login",
      element: <LoginPage />,
      loader: () => {
          if (localStorage.token) {
              return redirect("/");
          }
          return null;
      },
  },
]);

function App() {
  return (
      <>
          <RouterProvider router={router} />
      </>
  );
}

export default App;
