import React, {useState} from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";


const HomeHeader = () => {

  const handleCreateNew = () => {
    console.log('create new .md')
  }

  return (
    <AppBar
      sx={{
        bgcolor: "white",
      }}
      elevation={0}
      variant="outlined"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: '100%',
        }}
      >
        <Box sx={{
            display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Box
            sx={{
              position: "relative",
              width: "34px",
              height: "34px",
              border: "1px solid red",
              mr: 2,
              "& img": {
                objectFit: "contain",
              },
            }}
          >
            <Image src="/dog.png" alt="dog" fill />
          </Box>

          <Typography
            sx={{
              color: "#121212",
              fontWeight: 700,
              fontSize: "1.125rem"
            }}
          >
            Inkspill
          </Typography>
        </Box>

        <Box>
          
          <IconButton sx={{
            display: {md: "inline-flex", lg: "none" }
          }}>Menu</IconButton>

<Button variant="text" onClick={handleCreateNew} sx={{
            display: {md: "none", lg: "inline-flex" },
            margin: "0 0.5rem",
            padding: "0 10px",
            // height: "30px",
            lineHeight: "31px",
          }} size="small">Log in</Button>
          <Button variant="contained" onClick={handleCreateNew} sx={{
            display: {md: "none", lg: "inline-flex" },
            padding: "0 10px",
            // height: "30px",
            lineHeight: "31px",
          }} size="small">Create new .md</Button>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default HomeHeader