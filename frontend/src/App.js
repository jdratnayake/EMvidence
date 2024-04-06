import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import DeveloperTemplate from "./templates/DeveloperTemplate/DeveloperTemplate";
import InvestigatorTemplate from "./templates/InvestigatorTemplate/InvestigatorTemplate";


import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import EmFileListPage from "./pages/EmFileListPage/EmFileListPage";
import EmFileUploadPage from "./pages/EmFileUploadPage/EmFileUploadPage";
import UserManagePage from "./pages/UserManagePage/UserManagePage";
import PluginUploadListPage from "./pages/PluginUploadListPage/PluginUploadListPage";
import PluginUploadPage from "./pages/PluginUploadPage/PluginUploadPage";
import InvestigationPage from "./pages/InvestigationPage/InvestigationPage";
import PluginPage from "./pages/PluginsPage/PluginsPage";
import PluginVerifyPage from "./pages/PluginVerifyPage/PluginVerifyPage";

import AnalysisPage1 from "./pages/AnalysisPageModified/AnalysisPage1";
import PluginManagePage from "./pages/PluginManagePage/PluginManagePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* General */}
      <Route path="*" element={<ErrorPage />} />
      <Route index element={<HomePage />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />

      <Route
        path="plugin"
        element={<InvestigatorTemplate children={<PluginPage />} />}
      />

      {/* Admin */}
      <Route
        path="admin"
        element={<AdminTemplate children={<AdminPage />} />}
      />
      <Route
        path="user-list"
        element={<AdminTemplate children={<UserManagePage />} />}
      />
      <Route
        path="plugin-list"
        element={<AdminTemplate children={<PluginManagePage />} />}
      />
      <Route
        path="plugin-verify"
        element={<AdminTemplate children={<PluginVerifyPage />} />}
      />
      {/* Investigator */}
      <Route
        path="analysis"
        element={<InvestigatorTemplate children={<AnalysisPage />} />}
      />
      <Route
        path="file-list"
        element={<InvestigatorTemplate children={<EmFileListPage />} />}
      />
      <Route
        path="file-upload"
        element={<InvestigatorTemplate children={<EmFileUploadPage />} />}
      />
      <Route
        path="investigation"
        element={<InvestigatorTemplate children={<InvestigationPage />} />}
      />
      <Route
        path="profile"
        element={<InvestigatorTemplate children={<ProfilePage />} />}
      />
      <Route
        path="edit-profile"
        element={<InvestigatorTemplate children={<EditProfilePage />} />}
      />

      {/* Developer */}
      <Route
        path="plugin-upload-list"
        element={<DeveloperTemplate children={<PluginUploadListPage />} />}
      />
      <Route
        path="plugin-upload"
        element={<DeveloperTemplate children={<PluginUploadPage />} />}
      />

      {/* Modification Required UIs If Time Permits */}
      <Route path="analysis1" element={<AnalysisPage1 />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
