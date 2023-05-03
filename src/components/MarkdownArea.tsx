import React, {useState} from 'react'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MarkdownText from './MarkdownText';
import MarkdownRender from './MarkdownRender';
import MarkdownAI from "./MarkdownAI";
import EditablePage from './Editor/EditablePage';

interface MarkdownAreaInterface {
    newSelected: number
}
const MarkdownArea = ({newSelected}: MarkdownAreaInterface) => {
  const [useAI, setUseAI] = useState<boolean>(newSelected === 0)

  const handleGetMarkdownText = () => {
    setUseAI(false)
  }





  return (
    <Grid container sx={{
      // border: "1px solid red",
      height: "100%",
      // overflow: "hidden"
    }}>
        <Grid item xs={12} sm={6} md={6} sx={{
          // outline: "1px solid blue",
          height: "100%",
          overflowY: "scroll",
      
        }}>
        {useAI ? <MarkdownAI onGetMarkdown={handleGetMarkdownText} /> : <EditablePage />}
  
        </Grid>
        <Grid item xs={12} sm={6} md={6} sx={{
          // outline: "1px solid red",
          height: "100%",
          overflowY: "scroll",
        }}>
       <MarkdownRender />
        </Grid>
    </Grid>
  )
}

export default MarkdownArea