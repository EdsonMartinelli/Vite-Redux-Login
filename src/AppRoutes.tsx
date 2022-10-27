import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { RecoverPassword } from "./pages/RecoverPassword";
import { ConfirmEmail } from "./pages/ConfirmEmail";
import { AccountActivated } from "./pages/AccountActivated";
import { Profile } from "./pages/Profile";
import { AuthGuard } from "./guards/AuthGuard";
import { NoAuthGuard } from "./guards/NoAuthGuard";
import { Page } from "./pages/InterestingThing/Page";
import { Page2 } from "./pages/InterestingThing/Page2";
import { Header } from "./components/Header";
import { AuthController } from "./layouts/AuthController";

/*

   You need to pass location, and key in Routes because frame-motion use
   this information internally in page animation transition and others
   animations.

*/

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Header />}>
        <Route path="/" element={<Home />} />

        <Route
          element={
            <NoAuthGuard>
              <AuthController orientation={"LeftToRight"} />
            </NoAuthGuard>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/recover" element={<RecoverPassword />} />
        </Route>

        <Route
          element={
            <NoAuthGuard>
              <AuthController orientation={"RightToLeft"} />
            </NoAuthGuard>
          }
        >
          <Route path="/signup" element={<SignUp />} />
          <Route path="/active/:id" element={<ConfirmEmail />} />
          <Route path="/activated" element={<AccountActivated />} />
        </Route>

        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />

        <Route path="/test" element={<Page />} />

        <Route path="/test2" element={<Page2 />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
