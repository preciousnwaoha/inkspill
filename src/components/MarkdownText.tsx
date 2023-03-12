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


    return<Box sx={{
        minHeight: "100%",
        border: "1px solid red",
        p: 2,
    }}>
        <TextField 
        fullWidth
        multiline
        onChange={handleChange}
        value={markdown.text}
    />
        </Box>
}

export default MarkdownText
