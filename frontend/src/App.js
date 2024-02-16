import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import DeveloperPage from "./pages/DeveloperPage/DeveloperPage";
import InvestigatorPage from "./pages/InvestigatorPage/InvestigatorPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import EmFileListPage from "./pages/EmFileListPage/EmFileListPage";
import EmFileUploadPage from "./pages/EmFileUploadPage/EmFileUploadPage";
import UserManagePage from "./pages/UserManagePage/UserManagePage";
import PluginUploadListPage from "./pages/PluginUploadListPage/PluginUploadListPage";
import PluginUploadPage from "./pages/PluginUploadPage/PluginUploadPage";
import InvestigationPage from "./pages/InvestigationPage/InvestigationPage";

import AnalysisPage1 from "./pages/AnalysisPageModified/AnalysisPage1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* General */}
      <Route path="*" element={<ErrorPage />} />
      <Route index element={<HomePage />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />

      {/* Admin */}
      <Route path="admin" element={<AdminPage />} />
      <Route path="user-list" element={<UserManagePage />} />

      {/* Investigator */}
      <Route path="investigator" element={<InvestigatorPage />} />
      <Route path="analysis" element={<AnalysisPage />} />
      <Route path="file-list" element={<EmFileListPage />} />
      <Route path="file-upload" element={<EmFileUploadPage />} />
      <Route path="investigation" element={<InvestigationPage />} />

      {/* Developer */}
      <Route path="developer" element={<DeveloperPage />} />
      <Route path="plugin-upload-list" element={<PluginUploadListPage />} />
      <Route path="plugin-upload" element={<PluginUploadPage />} />

      {/* Modification Required UIs If Time Permits */}
      <Route path="analysis1" element={<AnalysisPage1 />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
