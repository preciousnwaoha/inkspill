import React, {useState} from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import Logo from "@/components/UI/Logo"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const Navbar = () => {
  const dispatch = useDispatch()
  
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
        bgcolor: "white",
        height: "45px",
        
      }}
      elevation={0}
      variant="outlined"

    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: '100%',
          height: "45px",
          px: 3,
          py: 0,
        }}
      >
        <Box sx={{
            display: "flex",
            alignItems: "center",
        }}>
          <Logo />

          <Typography
            variant="body1"
            sx={{
              color: "#121212",
              fontWeight: 300,
              border: "1px solid black",
              mx: 1,
            }}
          >
            {markdown.title}
          </Typography>
        </Box>
          
          
        <Box sx={{
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
          
        }}>

          
          {/* <Button variant="contained" onClick={handleCopy} disabled={copied}>{copied ? "COPIED" : "COPY README"}</Button> */}
          <Stack direction="row" spacing={1} sx={{
            mx: 2,
          }}>
            {/* <Button variant="outlined" sx={{
              borderRadius: "16px",
              fontSize: "0.75rem",
              lineHeight: "0.75rem",
              fontWeight: 400,
              padding: "0 10px",
              border: "none",
              outline: "1px solid grey.A500"
            }} size="small">
              Copy Markdown
            </Button> */}
            <Chip
              label="Copy Markdown"
              onClick={handleCopy}
              deleteIcon={<DoneIcon />}
              variant="outlined"
              size="small"
            />
            <Chip
              label="Push to Github"
              onClick={handleCopy}
              deleteIcon={<DoneIcon />}
              variant="outlined"
              size="small"
            />
    </Stack>
          <Avatar alt="Remy Sharp" src="https://picsum.photos/id/237/200/300.jpg" 
          sx={{
             bgcolor: "#f6f5f4",
             width: 24,
             height: 24,
             margin: 0,
             cursor: "pointer"
          }} >
            R
            </Avatar>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
