import Head from "next/head";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/store";
import MarkdownArea from "@/components/MarkdownArea"
import Navbar from "@/components/Navbar";
import Box from "@mui/material/Box"

export default function Home() {
  // const app = useSelector((state: RootState) => state.app)



  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Navbar />
      <Box component="main" sx={{
        mt: "50px",
        height: { xs: "auto", md: "calc(100vh - 50px)"},
        overflow: {xs: "auto", md: "hidden"},
      }}>
        
        
        <MarkdownArea />
      </Box>
    </div>
  );
}
