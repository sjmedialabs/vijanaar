import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import ForgotPasswordForm from "./components/forgotpassword";
import ResetPasswordForm from "./components/resetPassword";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./pages/OtherPage/NotFound";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

//-----------------------------------------------------------SKC MINEs Dashboard Routes--------------------------
import HomePageSectionOne from "./Vijanaar/HomePage/SectionOne";
import HomePageSectionTwo from "./Vijanaar/HomePage/SectionTwo";
import HomePageSectionThreeEl from "./Vijanaar/HomePage/SectionThree";
import HomePageSectionFour from "./Vijanaar/HomePage/SectionFour";
import HomePageSectionFive from "./Vijanaar/HomePage/SectionFive";
import HomePageSectionSix from "./Vijanaar/HomePage/SectionSix";
import HomePageSectionSeven from "./Vijanaar/HomePage/SectionSeven";
import HomePageSectionEight from "./Vijanaar/HomePage/SectionEight";
import HomePageSectionNine from "./Vijanaar/HomePage/SectionNine";

import AboutPageSectionOne from "./Vijanaar/AboutPage/SectionOne";
import AboutPageSectionTwo from "./Vijanaar/AboutPage/SectionTwo";
import AboutPageSectionThree from "./Vijanaar/AboutPage/SectionThree";
import AboutPageSectionFive from "./Vijanaar/AboutPage/SectionFive";

import CourseSectionFour from "./Vijanaar/ProductsPage/SectioonFour";
import PublicRoute from "./routes/PublicRoutes";

import TestimonialSectionOne from "./Vijanaar/TestimonialPage/SectionOne";
import TestimonialSectionTwo from "./Vijanaar/TestimonialPage/SectionFour";

import PlacementPageSectionOne from "./Vijanaar/PlacementsPage/SectionOne";
import PlacementPageSectionTwo from "./Vijanaar/PlacementsPage/SectionTwo";
import PlacementPageSectionThree from "./Vijanaar/PlacementsPage/SectionThree";

import ContactPageSectionOne from "./Vijanaar/ConactPage/SectionOne";
import ContactPageSectionTwo from "./Vijanaar/ConactPage/SectionTwo";

import CompanyDetails from "./Vijanaar/CompanyDetailsPage";
import CoursesSectionFive from "./Vijanaar/ProductsPage/SectionFive";
import CoursesSectionSix from "./Vijanaar/ProductsPage/SectionSix";
import CoursesSectionSeven from "./Vijanaar/ProductsPage/SectionSeven";
import CoursesSectionEight from "./Vijanaar/ProductsPage/SectionEight";
import CoursesSectionNine from "./Vijanaar/ProductsPage/SectionNine";
import CoursesSectionTen from "./Vijanaar/ProductsPage/SectionTen";
import CoursesSectionOne from "./Vijanaar/ProductsPage/SectionOne";
import CoursesSectionTwo from "./Vijanaar/ProductsPage/SectionTwo";
import CoursesSectionThree from "./Vijanaar/ProductsPage/SectionThree";
import AdminCourseForm from "./Vijanaar/AddNewProgram";
import CoursesBanner from "./Vijanaar/Courses";
export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={ <PrivateRoute>
              <AppLayout />
            </PrivateRoute>}>
            <Route index path="/" element={<PrivateRoute><HomePageSectionOne/></PrivateRoute>} />
            <Route  path="/home/section2" element={<PrivateRoute><HomePageSectionTwo/></PrivateRoute>} />
            <Route  path="/home/section3" element={<PrivateRoute><HomePageSectionThreeEl/></PrivateRoute>} />
            <Route  path="/home/section4" element={<PrivateRoute><HomePageSectionFour/></PrivateRoute>} />
            <Route  path="/home/section5" element={<PrivateRoute><HomePageSectionFive/></PrivateRoute>} />
            <Route  path="/home/section6" element={<PrivateRoute><HomePageSectionSix/></PrivateRoute>} />
            <Route  path="/home/section7" element={<PrivateRoute><HomePageSectionSeven/></PrivateRoute>} />
            <Route  path="/home/section8" element={<PrivateRoute><HomePageSectionEight/></PrivateRoute>} />
            <Route  path="/home/section9" element={<PrivateRoute><HomePageSectionNine/></PrivateRoute>} />
            {/* ----------------------------------------------------About Page Routes------------------------- */}

            <Route path="/about/section1" element={<PrivateRoute><AboutPageSectionOne /></PrivateRoute>} />
            <Route path="/about/section2" element={<PrivateRoute><AboutPageSectionTwo /></PrivateRoute>} />
            <Route path="/about/section3" element={<PrivateRoute><AboutPageSectionThree /></PrivateRoute>} />
            <Route path="/about/section5" element={<PrivateRoute><AboutPageSectionFive /></PrivateRoute>} />
           

            {/* ----------------------------------------------------Products Page Routes------------------------- */}
            <Route path="/addNewProgram" element={<PrivateRoute><AdminCourseForm /></PrivateRoute>} />
            <Route path="/trainingPrograms" element={<PrivateRoute><CoursesBanner /></PrivateRoute>} />

            <Route path="/courses/section1" element={<PrivateRoute><CoursesSectionOne /></PrivateRoute>} />
            <Route path="/courses/section2" element={<PrivateRoute><CoursesSectionTwo /></PrivateRoute>} />
            <Route path="/courses/section3" element={<PrivateRoute><CoursesSectionThree /></PrivateRoute>} />
            <Route path="/courses/section4" element={<PrivateRoute><CourseSectionFour /></PrivateRoute>} />
            <Route path="/courses/section5" element={<PrivateRoute><CoursesSectionFive /></PrivateRoute>} />
            <Route path="/courses/section6" element={<PrivateRoute><CoursesSectionSix /></PrivateRoute>} />
            <Route path="/courses/section7" element={<PrivateRoute><CoursesSectionSeven /></PrivateRoute>} />
            <Route path="/courses/section8" element={<PrivateRoute><CoursesSectionEight /></PrivateRoute>} />
            <Route path="/courses/section9" element={<PrivateRoute><CoursesSectionNine /></PrivateRoute>} />
            <Route path="/courses/section10" element={<PrivateRoute><CoursesSectionTen /></PrivateRoute>} />

            {/* ----------------------------------------------------Courses detail mica Page Routes------------------------- */}

            <Route path="/testimonial/section1" element={<PrivateRoute><TestimonialSectionOne /></PrivateRoute>} />
            <Route path="/testimonial/section2" element={<PrivateRoute><TestimonialSectionTwo /></PrivateRoute>} />

  {/* ----------------------------------------------------Placements Page Routes------------------------- */}
            <Route path="/placements/section1" element={<PrivateRoute><PlacementPageSectionOne /></PrivateRoute>} />
            <Route path="/placements/section2" element={<PrivateRoute><PlacementPageSectionTwo /></PrivateRoute>} />
            <Route path="/placements/section3" element={<PrivateRoute><PlacementPageSectionThree /></PrivateRoute>} />
  {/* ----------------------------------------------------Products detail csr Page Routes------------------------- */}
              <Route path="/contact/section1" element={<PrivateRoute><ContactPageSectionOne /></PrivateRoute>} />
            <Route path="/contact/section2" element={<PrivateRoute><ContactPageSectionTwo /></PrivateRoute>} />

            <Route path="/company-details" element={<PrivateRoute><CompanyDetails /></PrivateRoute>} />

            {/* Forms */}
            <Route path="/form-elements" element={<PrivateRoute><FormElements /></PrivateRoute>} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<PublicRoute>
      <SignIn />
    </PublicRoute>} />
  
          <Route path="/forgotpassword" element={<ForgotPasswordForm/>}/>
          <Route path="/reset-password/:token" element={<ResetPasswordForm/>}/>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
