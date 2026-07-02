import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PageLoader } from "./components/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const AboutLayout = lazy(() => import("./pages/about/AboutLayout"));
const AboutMission = lazy(() => import("./pages/about/Mission"));
const AboutHistory = lazy(() => import("./pages/about/History"));
const AboutValues = lazy(() => import("./pages/about/Values"));
const ServicesIndex = lazy(() => import("./pages/services/ServicesIndex"));
const ServiceDetail = lazy(() => import("./pages/services/ServiceDetail"));
const TeamsIndex = lazy(() => import("./pages/teams/TeamsIndex"));
const TeamDetail = lazy(() => import("./pages/teams/TeamDetail"));
const CareersHome = lazy(() => import("./pages/careers/CareersHome"));
const CareersJobs = lazy(() => import("./pages/careers/Jobs"));
const CareersApply = lazy(() => import("./pages/careers/Apply"));
const CareersCulture = lazy(() => import("./pages/careers/Culture"));
const Contact = lazy(() => import("./pages/Contact"));
const Quote = lazy(() => import("./pages/Quote"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutLayout />}>
            <Route index element={<Navigate to="mission" replace />} />
            <Route path="mission" element={<AboutMission />} />
            <Route path="history" element={<AboutHistory />} />
            <Route path="values" element={<AboutValues />} />
          </Route>
          <Route path="services" element={<ServicesIndex />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="teams" element={<TeamsIndex />} />
          <Route path="teams/:slug" element={<TeamDetail />} />
          <Route path="careers" element={<CareersHome />} />
          <Route path="careers/jobs" element={<CareersJobs />} />
          <Route path="careers/jobs/apply" element={<CareersApply />} />
          <Route path="careers/culture" element={<CareersCulture />} />
          <Route path="contact" element={<Contact />} />
          <Route path="quote" element={<Quote />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
