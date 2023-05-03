import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MarkdownInterface {
    text: string,
    id: string,
    name: string,
}

export interface appState {
    theme: number,
    ids: string[],
    markdown: MarkdownInterface,
    templates: {
        name: string,
        markdown: string,
    }[]
}

const initialState: appState = {
    theme: 1,
    ids: [],
    markdown: {
        text: "",
        id: "",
        name: "",
    },
    templates: []
}


const appSlice = createSlice( {
    name: "app",
    initialState,
    reducers: {
        changeTheme(state) {
            state.theme = state.theme + 0.1
        },
        updateMarkdown(state, action: PayloadAction<{text: string}>) {
            state.markdown.text =  action.payload.text

        },
        selectProject(state, action: PayloadAction<{id: string}>) {
            // state.markdown.text =  
            // state.markdown.id =
        },
        updateTemplates(state, action: PayloadAction<{
            name:string,
            markdown: string
        }[]>) {
            state.templates = action.payload
        }
    }
})

export const appActions = appSlice.actions


export default appSlice;