import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { Home } from "../view/pages/Home";
import { AuthLayout } from "../view/layouts/AuthLayout";
import { PrivatePageLayout } from "../view/layouts/PrivatePageLayout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<PrivatePageLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
