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
import ReportPage from "./pages/ReportPage/ReportPage";
import PluginPage from "./pages/PluginsPage/PluginsPage";
import PluginVerifyPage from "./pages/PluginVerifyPage/PluginVerifyPage";
import PluginVerifyListPage from "./pages/PluginVerifyListPage/PluginVerifyListPage";
import ViewUserPage from "./pages/ViewUserPage/ViewUserPage";

import AnalysisPage1 from "./pages/AnalysisPageModified/AnalysisPage1";
import PluginManagePage from "./pages/PluginManagePage/PluginManagePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";

//for file upload test
import FileUploadTestingPage from "./pages/FileUploadTestingPage/FileUploadTestingPage";
import ChunkFileUploadTest from "./pages/FileUploadTestingPage/TestChunkFileUpload";
// for file hasing test
import Sha256 from "./pages/TestSenal/Sha256";
import BlowFish from "./pages/TestSenal/BlowFish";
import AesCbc from "./pages/TestSenal/AesCBC";
// for file compression test
import Gzip from "./pages/TestSenal/Gzip";
import Deflate from "./pages/TestSenal/Deflate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* General */}
      <Route path="*" element={<ErrorPage />} />
      <Route index element={<HomePage />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />

      {/* Admin */}
      <Route
        path="admin"
        element={
          <AdminTemplate pageName="Dashboard" children={<AdminPage />} />
        }
      />
      <Route
        path="user-list"
        element={
          <AdminTemplate pageName="Users" children={<UserManagePage />} />
        }
      />
      <Route
        path="user/:selectedUserId"
        element={<AdminTemplate pageName="user" children={<ViewUserPage />} />}
      />
      {/* Contains all plugins */}
      <Route
        path="plugin-list"
        element={
          <AdminTemplate pageName="Plugins" children={<PluginManagePage />} />
        }
      />
      {/* Contains verification required plugins */}
      <Route
        path="plugin-verify-list"
        element={
          <AdminTemplate
            pageName="Plugins"
            children={<PluginVerifyListPage />}
          />
        }
      />
      <Route
        path="plugin-verify/:pluginId"
        element={
          <AdminTemplate pageName="Plugins" children={<PluginVerifyPage />} />
        }
      />

      {/* Investigator */}
      <Route
        path="report"
        element={
          <InvestigatorTemplate pageName="Analysis" children={<ReportPage />} />
        }
      />
      <Route
        path="analysis"
        element={
          <InvestigatorTemplate
            pageName="Analysis"
            children={<AnalysisPage />}
          />
        }
      />
      <Route
        path="file-list"
        element={
          <InvestigatorTemplate
            pageName="Upload File"
            children={<EmFileListPage />}
          />
        }
      />
      <Route
        path="file-upload"
        element={
          <InvestigatorTemplate
            pageName="Upload File"
            children={<EmFileUploadPage />}
          />
        }
      />
      <Route
        path="profile"
        element={
          <InvestigatorTemplate pageName="Profile" children={<ProfilePage />} />
        }
      />
      <Route
        path="edit-profile"
        element={<InvestigatorTemplate children={<EditProfilePage />} />}
      />
      <Route
        path="plugin"
        element={
          <InvestigatorTemplate pageName="Plugin" children={<PluginPage />} />
        }
      />

      {/* Developer */}
      <Route
        path="plugin-upload-list"
        element={
          <DeveloperTemplate
            pageName="Upload Plugin"
            children={<PluginUploadListPage />}
          />
        }
      />
      <Route
        path="plugin-upload"
        element={
          <DeveloperTemplate
            pageName="Upload Plugin"
            children={<PluginUploadPage />}
          />
        }
      />

      {/* Modification Required UIs If Time Permits */}
      <Route path="analysis1" element={<AnalysisPage1 />} />
      {/* { for testing} */}
      <Route path="testUploadTradi" element={<FileUploadTestingPage />} />
      <Route path="testUploadChunk" element={<ChunkFileUploadTest />} />
      <Route path="testSha256" element={<Sha256 />} />
      <Route path="testBlowFish" element={<BlowFish />} />
      <Route path="testAesCbc" element={<AesCbc />} />
      <Route path="testGzip" element={<Gzip />} />
      <Route path="testDeflate" element={<Deflate />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
