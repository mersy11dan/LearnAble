import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AccessibilityPage } from "./pages/AccessibilityPage";
import { CareersPage } from "./pages/CareersPage";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";
import { OfflinePage } from "./pages/OfflinePage";
import { PipelinePage } from "./pages/PipelinePage";
import { ReadPage } from "./pages/ReadPage";
import { SavannaPage } from "./pages/SavannaPage";
import { SessionPage } from "./pages/SessionPage";
import { TracksPage } from "./pages/TracksPage";
import { VerifyPage } from "./pages/VerifyPage";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="lesson/:lessonId" element={<LessonPage />} />
        <Route path="lesson/:lessonId/read" element={<ReadPage />} />
        <Route path="offline" element={<OfflinePage />} />
        <Route path="sessions/studio" element={<SessionPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="verify" element={<VerifyPage />} />
        <Route path="verify/:code" element={<VerifyPage />} />
        <Route path="pipeline" element={<PipelinePage />} />
        <Route path="savanna" element={<SavannaPage />} />
        <Route path="tracks" element={<TracksPage />} />
        <Route path="accessibility" element={<AccessibilityPage />} />
        <Route
          path="*"
          element={
            <div className="page">
              <h1>That page is not here</h1>
              <p>Use the menu to return to the lesson.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
