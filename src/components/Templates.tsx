import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import { appActions } from "@/store/app-slice";

interface TemplatesInterface {
  onSelected: () => void
}

const Templates = ({onSelected}: TemplatesInterface) => {
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const [loading, setLoading] = useState(false)

  const {templates} = app
  

  const handleSelectTemplate = async (_template: number) => {
    const markdown = {
      text: templates[_template].markdown
    }
    dispatch(appActions.updateMarkdown(markdown))
    onSelected()
  }

  useEffect(() => {
    const getTemplates = async () => {
      await fetch("/templates.json", {method: "GET"})
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        dispatch(appActions.updateTemplates(json.templates))
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
    }


    setLoading(true)
    getTemplates()
  }, [dispatch])

  return (
    <Box>

      {loading ? <Box>
        Loading
      </Box> 
      : <Box>
      {templates.map((template, index) => {
        return <Paper key={index} onClick={() => {handleSelectTemplate(index)}}>
          {template.name}
        </Paper>
      })}
      </Box>}
      
    </Box>
  )
}

export default Templates