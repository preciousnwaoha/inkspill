import Head from "next/head";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/store";
import Box from "@mui/material/Box"
import Hero from "@/components/Home/Hero"
import HomeHeader from "@/components/Home/HomeHeader"
import Metrics from "@/components/Home/Metrics"
import Features from "@/components/Home/Features"
import BottomActionCall from "@/components/Home/BottomActionCall";
import KeyPoints from "@/components/Home/KeyPoints"
import HomeFooter from "@/components/Home/HomeFooter"


export default function Home() {
  // const app = useSelector((state: RootState) => state.app)



  return (
    <div>
      <Head>
        <title>Inkspill - Create README files is seconds</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <HomeHeader />
      <Box  component="main"
        sx={{
          mt: {sm: "64px", xs: "56px"},
          outline: "1px solid black",
        }}>
          
      <Hero />
      <Metrics />
      <Features />
      <KeyPoints />
      <BottomActionCall />
      </Box>
      <HomeFooter />
    </div>
  );
}
