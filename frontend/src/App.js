import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import HomePageDeveloper from "./pages/HomePageDeveloper/HomePageDeveloper";
import HomePageInvestigator from "./pages/HomePageInvestigator/HomePageInvestigator";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import EmFilesPage from "./pages/EmFilesPage/EmFilesPage";
import UploadFilePage from "./pages/UploadFilePage/UploadFilePage";
import AnalysisPage1 from "./pages/AnalysisPageModified/AnalysisPage1";
import UserManagePage from "./pages/UserManagePage/UserManagePage";
import UploadPluginPage1 from "./pages/UploadPluginPage1/UploadPluginPage1";
import UploadPluginPage2 from "./pages/UploadPluginPage2/UploadPluginPage2";
import InvestigationPage from "./pages/InvestigationPage/InvestigationPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="admin" element={<DashboardAdmin />} />
      <Route path="investigator" element={<HomePageInvestigator />} />
      <Route path="developer" element={<HomePageDeveloper />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />
      <Route path="analysis" element={<AnalysisPage />} />

      <Route path="file-list" element={<EmFilesPage />} />
      <Route path="file-upload" element={<UploadFilePage />} />
      <Route path="user-list" element={<UserManagePage />} />
      <Route path="plugin-upload-list" element={<UploadPluginPage1 />} />
      <Route path="plugin-upload" element={<UploadPluginPage2 />} />
      <Route path="investigation" element={<InvestigationPage />} />

      {/* This must be updated if time permits */}
      <Route path="analysis1" element={<AnalysisPage1 />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
