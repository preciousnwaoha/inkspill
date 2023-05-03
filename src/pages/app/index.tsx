import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import MarkdownArea from "@/components/MarkdownArea";
import Templates from "@/components/Templates";
import MarkdownNew from "@/components/MarkdownNew";
import Navbar from "@/components/Navbar";
import Box from "@mui/material/Box";

export default function App() {
  const dispatch = useDispatch()
  // const app = useSelector((state: RootState) => state.app)
  const [newSelected, setNewSelected] = useState<undefined | number>(undefined) // 0, 1, 2
  const [showTemplates, setShowTemplates] = useState(false)

  const handleNew = (_newType: number) => {
    if (_newType === 1) {
      setShowTemplates(true)
    } else {
      dispatch(appActions.updateMarkdown({text: ""}))
      setNewSelected(_newType)
    }
    
  }

  const handleSelectedTemplate = () => {
    setShowTemplates(false)
    setNewSelected(1)
  }

  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Navbar />
      <Box
        component="main"
        sx={{
          mt: {sm: "64px", xs: "56px"},
          height: {
            xs: "auto",
            sm: "calc(100vh - 64px)"
          },
          overflow: { xs: "auto", md: "hidden" },
          // outline: "4px solid black",
        }}
      >
        {((newSelected === undefined) && !showTemplates) && <MarkdownNew onHandleNew={handleNew} />}
        {showTemplates && <Templates onSelected={handleSelectedTemplate} /> }
        {((newSelected !== undefined) && !showTemplates) && <MarkdownArea newSelected={newSelected} />}
      </Box>
    </div>
  );
}
