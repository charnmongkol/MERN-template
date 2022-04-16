import React, { lazy, Suspense } from "react";
import ResponsiveAppBar from "../../components/Header/AppBar";
import FloatingBox from "../../components/FloatingBox/FloatingBox";

const ToursSlider = lazy(() =>
  import("../../components/ToursSlider/ToursSlider")
);
const Banner = lazy(() => import("../../components/Banner/Banner"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const LandingPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
      </Suspense>
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
