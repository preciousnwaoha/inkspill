import React, {useState} from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  const { markdown } = app;

  const [copied, setCopied] = useState<boolean>(false);

const handleCopy = () => {

      navigator.clipboard.writeText(markdown.text);


        setCopied(true)

        setTimeout(() => {
                  setCopied(false)
        }, 3000);
    
  }

  return (
    <AppBar
      sx={{
        bgcolor: "transparent",
        
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
          // border: "1px solid black"
        }}
      >
        <Box sx={{
            display: "flex",
            alignItems: "center",
            // border: "1px solid black",
        }}>
          <Box
            sx={{
              position: "relative",
              width: "34px",
              height: "34px",
              display: "inline-block",
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
              color: "black",
            }}
          >
            Inkspill
          </Typography>
        </Box>
          
          
        <Box>

          
          {/* <Button variant="contained" onClick={handleCopy} disabled={copied}>{copied ? "COPIED" : "COPY README"}</Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
