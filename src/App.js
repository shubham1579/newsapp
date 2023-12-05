import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewsBoardPage from "./pages/NewsBoardPage";
import { AuthContextProvider } from "./context/authContext";
import { NewsContextProvider } from "./context/newsContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import FavoritePage from "./pages/FavoritesPage";


function App() {

  const router = createBrowserRouter([
    {path: '/', element: <NewsBoardPage />},
    {path: '/login', element: <LoginPage />},
    {path: '/signup', element: <SignUpPage />},
    {path: '/favorites', element: <FavoritePage />}
  ]);


  return (
    <AuthContextProvider>
      <NewsContextProvider>
        <RouterProvider router={router} />
      </NewsContextProvider>
    </AuthContextProvider>
  );
}

export default App;