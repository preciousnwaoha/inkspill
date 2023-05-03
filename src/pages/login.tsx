import React from "react"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import Box from "@mui/material/Box"

const Login = () => {
    const { data: session } = useSession()

    console.log({session})

    if (session) {
        return (
          <>
          <p>Welcome,  {session.user!.name}</p>
          <Box sx={{width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden"}}>
          <Image src={`${session.user!.image}`} alt={`${session.user!.name} Github Profile Picture`}  fill />
          </Box>
          
             Signed in a {session.user!.email}<br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )
      }
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )
}


export default Login;