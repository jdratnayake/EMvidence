import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePageAdmin from "./pages/HomePageAdmin/HomePageAdmin";
import HomePageDeveloper from "./pages/HomePageDeveloper/HomePageDeveloper";
import HomePageInvestigator from "./pages/HomePageInvestigator/HomePageInvestigator";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import EmFilesPage from "./pages/EmFilesPage/EmFilesPage";
import UploadFilePage from "./pages/UploadFilePage/UploadFilePage";
import AnalysisPage1 from "./pages/AnalysisPageModified/AnalysisPage1";
import UserManagePage from "./pages/UserManagePage/UserManagePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="admin" element={<HomePageAdmin />} />
      <Route path="investigator" element={<HomePageInvestigator />} />
      <Route path="developer" element={<HomePageDeveloper />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />
      <Route path="analysis" element={<AnalysisPage />} />
      <Route path="analysis1" element={<AnalysisPage1 />} />
      <Route path="file_manage" element={<EmFilesPage />} />
      <Route path="file_upload" element={<UploadFilePage />} />
      <Route path="user_manage" element={<UserManagePage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
