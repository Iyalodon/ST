import { Route } from "react-router-dom";
import Register from "../pages/auth/registerPage";
import Login from "../pages/auth/loginPage";
// import Regpage from "../pages/test";
import ProtectedPage from "./protectedPage";
import ProfilePage from "../pages/profilePage";
import HomePage from "../pages/homePage";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/register"
    element={
      <ProtectedPage>
        <Register />
      </ProtectedPage>
    }
  />,
  <Route
    path="/login"
    element={
      <ProtectedPage>
        <Login />
      </ProtectedPage>
    }
  />,
  <Route
    path="/profile"
    element={
      <ProtectedPage needLogin={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  />,

  // <Route path="/test" element={<Regpage />}></Route>,
  // <Route path="/sidebar" element={<Sidebar />}></Route>,
];

export default routes;
