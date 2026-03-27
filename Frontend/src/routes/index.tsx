import React from "react";
import { Route, Routes } from "react-router-dom";

import { AuthLayout, DashboardLayout } from "components/layout";
import { lazyImport } from "utils/lazyImport";
import { CheckLogin } from "features/auth";
import ProtectedRoute from "./ProtectedRoute";

const { Login } = lazyImport(() => import("features/auth"), "Login");

const { Collaboration } = lazyImport(
  () => import("features/collaboration"),
  "Collaboration"
);
const { Implementation } = lazyImport(
  () => import("features/implementation"),
  "Implementation"
);
const { Dashboard } = lazyImport(
  () => import("features/dashboard"),
  "Dashboard"
);
const { CollaborationEditPage } = lazyImport(
  () => import("features/collaboration"),
  "CollaborationEditPage"
);
const { CollaborationAddPage } = lazyImport(
  () => import("features/collaboration"),
  "CollaborationAddPage"
);
const { CollaborationMakerPDF } = lazyImport(
  () =>
    import(
      "features/collaboration/components/collaboration/CollaborationMakerPDF"
    ),
  "CollaborationMakerPDF"
);

const { Role } = lazyImport(() => import("features/role"), "Role");
const { Contact } = lazyImport(() => import("features/contact"), "Contact");
const { Faculty } = lazyImport(() => import("features/faculty"), "Faculty");
const { Prodi } = lazyImport(() => import("features/prodi"), "Prodi");
const { Dekan } = lazyImport(() => import("features/dekan"), "Dekan");
const { User } = lazyImport(() => import("features/user"), "User");
const { Type } = lazyImport(() => import("features/type"), "Type");
const { Organization } = lazyImport(
  () => import("features/organization"),
  "Organization"
);
const { Dosen } = lazyImport(() => import("features/dosen"), "Dosen");

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route
          index
          element={
            <ProtectedRoute requiredPages={["dashboard"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kerjasama"
          element={
            <ProtectedRoute requiredPages={["kerjasama"]}>
              <Collaboration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kerjasama/edit/:id"
          element={
            <ProtectedRoute requiredPages={["kerjasama"]}>
              <CollaborationEditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kerjasama/add"
          element={
            <ProtectedRoute requiredPages={["kerjasama"]} requiredLevel={true}>
              <CollaborationAddPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/implementasi"
          element={
            <ProtectedRoute requiredPages={["implementasi"]}>
              <Implementation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/role"
          element={
            <ProtectedRoute requiredPages={["role"]}>
              <Role />
            </ProtectedRoute>
          }
        />
        <Route
          path="/penghubung"
          element={
            <ProtectedRoute requiredPages={["penghubung"]}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fakultas"
          element={
            <ProtectedRoute requiredPages={["fakultas"]}>
              <Faculty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prodi"
          element={
            <ProtectedRoute requiredPages={["prodi"]}>
              <Prodi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dekan"
          element={
            <ProtectedRoute requiredPages={["dekan"]}>
              <Dekan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredPages={["user"]}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/type"
          element={
            <ProtectedRoute requiredPages={["jenis"]}>
              <Type />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <ProtectedRoute requiredPages={["organisasi"]}>
              <Organization />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dosen"
          element={
            <ProtectedRoute requiredPages={["dosen"]}>
              <Dosen />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/authenticate" element={<CheckLogin />} />
    </Routes>
  );
};

export default AppRoutes;
