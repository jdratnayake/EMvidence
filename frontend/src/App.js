import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import EmFilesPage from "./pages/EmFilesPage/EmFilesPage";
import UploadFilePage from "./pages/UploadFilePage/UploadFilePage";
import AnalysisPage1 from "./pages/AnalysisPageModified/AnalysisPage1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignUpPage />} />
      <Route path="analysis" element={<AnalysisPage />} />
      <Route path="analysis1" element={<AnalysisPage1 />} />
      <Route path="file_manage" element={<EmFilesPage />} />
      <Route path="file_upload" element={<UploadFilePage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
