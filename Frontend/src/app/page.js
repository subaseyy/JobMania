import React from "react";
import Hero from "./home/components/Hero";
import Logo from "./home/components/Logo";
import Category from "./home/components/Category";
import FeaturedJobs from "./home/components/FeaturedJobs";
import JobList from "./home/components/JobList";
import Jobs from "./home/components/Jobs";

const Home = () => {
  return (
    <div>
      <Hero />
      <Logo />
      <Category />
      <Jobs />
      <FeaturedJobs />
      <JobList />
    </div>
  );
};

export default Home;
