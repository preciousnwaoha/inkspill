import React, {useState, useEffect} from "react"
import Box from "@mui/material/Box"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { remark } from 'remark';
import html from 'remark-html';
import { Truculenta } from "next/font/google";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { createFalse } from "typescript";


// interface MarkdownRenderInterface {
//     id: string
// }

const MarkdownRender = ( ) => {
  const app = useSelector((state: RootState) => state.app)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>();

  const {markdown} = app
  const {text } = markdown

  useEffect(() => {
    const data = async () => {

        const processedContent =await  remark()
    .use(html)
    .process(text);
     const contentHtml = processedContent.toString();

     setResult(contentHtml)
     setLoading(false)
    }

    setLoading(true)
    data()
    
  }, [text, loading, result])
 

    return <Box sx={{
        
        p: 2,
    }}>
        {!loading && <Box dangerouslySetInnerHTML={{ __html: result }}></Box>}
        {loading && <Box>Loading</Box>}
        </Box>
}

export default MarkdownRender