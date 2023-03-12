import React, {useState} from "react"
import Box from "@mui/material/Box"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import TextField from "@mui/material/TextField"
import { appActions } from "@/store/app-slice";

// interface MarkdownTextInterface {
//     id: string
// }

const MarkdownText = () => {
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const {markdown} = app


    const handleChange = (event: any) => {
        // setMarkdownInput(event.target.value)
        dispatch(appActions.updateMarkdown({text: event.target.value}))
    }

  
    // async function onSubmit(event: any) {
    //   event.preventDefault();
    //   try {
    //     const response = await fetch("/api/generate", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ markdown: markdown.text }),
    //     });
  
    //     const data = await response.json();
    //     if (response.status !== 200) {
    //       throw data.error || new Error(`Request failed with status ${response.status}`);
    //     }
  
    //     console.log(data.result)
    //   } catch(error: any) {
    //     // Consider implementing your own error handling logic here
    //     console.error(error);
    //     alert(error.message);
    //   }
    // }

    return <TextField 
        onChange={handleChange}
        value={markdown.text}
    />
}

export default MarkdownText

/**
 * <form onSubmit={onSubmit}>
         
          <input type="submit" value="Generate names" />
        </form>
 */