import React, { lazy, Suspense } from "react";
import ResponsiveAppBar from "../../components/Header/AppBar";
import Banner from "../../components/Banner/Banner";
import FloatingBox from "../../components/FloatingBox/FloatingBox";

const ToursSlider = lazy(() =>
  import("../../components/ToursSlider/ToursSlider")
);
const Footer = lazy(() => import("../../components/Footer/Footer"));

const LandingPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Banner />
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ToursSlider />
      </Suspense> */}
      <FloatingBox />
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default LandingPage;
