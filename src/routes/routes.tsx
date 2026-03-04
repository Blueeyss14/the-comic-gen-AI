import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const MainComicPage = lazy(() => import("../features/ComicGen/views/pages/MainComicPage"));


const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-grayy border-dotted rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainComicPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
