import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const MainComicPage = lazy(
  () => import("../features/ComicGen/views/pages/MainComicPage"),
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-4 h-4 border-2 border-gray-200 border-t-grayy rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainComicPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
