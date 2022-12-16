import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MovieDetailPage from "../pages/MovieDetailPage";
import MovieHomePage from "../pages/MovieHomePage";
import NoMatchPage from "../pages/NoMatchPage";
import TopRatedPage from "../pages/TopRatedPage";
export default function MainRouters() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MovieHomePage />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
        <Route path="top-rated" element={<TopRatedPage />} />

        <Route path="*" element={<NoMatchPage />} />
      </Route>
    </Routes>
  );
}
