import React, {useState, useEffect} from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { remark } from 'remark';
import html from 'remark-html';
import { Truculenta } from "next/font/google";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { createFalse } from "typescript";
import { Octokit } from "@octokit/rest";


const MarkdownRender = ( ) => {
  const app = useSelector((state: RootState) => state.app)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>();
  const [htmlContent, setHtmlContent] = useState<string>('');

  const {markdown} = app
  const {text  } = markdown

  const markdownString = text

  // useEffect(() => {

    // const data = async () => {

    //     const processedContent =await  remark()
    // .use(html)
    // .process(markdownString);
    //  const contentHtml = processedContent.toString();

    //  setResult(contentHtml)
    //  setLoading(false)
    // }

    

  //   setLoading(true)
  //   data()
    
  // }, [markdownString, loading, result])


  useEffect(() => {
    const doYou = async () => {
       // Octokit.js
    // https://github.com/octokit/core.js#readme

    // Create an instance of Octokit.
    // const octokit = new Octokit();

    // Create an instance of Octokit with a personal access token.
    const octokit = new Octokit({
      auth: process.env.NEXT_PUBLIC_GITHUB_PAT
    });


      // Use the Octokit instance to call the 'markdown.render' method.
      octokit.markdown.render({
        text: text,
        mode: 'markdown',
      })
      .then(response => {
        // Get the HTML content from the response.
        setHtmlContent(response.data);
        // console.log(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
   }

   if (text.trim() !== "" ) {
    setLoading(true);
    doYou();
   }
      
  }, [text])
  
 

    return <Box sx={{
        
        p: 2,
    }}>
        {/* {!loading && <Box dangerouslySetInnerHTML={{ __html: result }}></Box>} */}
        {loading && <Box>Loading</Box>}
        {/* Render the HTML content */}
      <Box dangerouslySetInnerHTML={{ __html: htmlContent }} ></Box>
        {/* <Button onClick={doYou}>Markdown</Button> */}
        </Box>
}

export default MarkdownRender