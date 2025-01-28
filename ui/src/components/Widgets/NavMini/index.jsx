import React from 'react'
import { Link } from 'react-router-dom';
import {Button, IconButton, InputAdornment, InputBase, Stack} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import logo from '@/assets/images/logo/png/logo_transparent.png';


const NavMiniComponent = () => {
  return (
    <Stack 
      direction="row"
      justifyContent="space-around"
      p={2}
      sx={{
      width: "75%",
      height: "120px",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden",
      margin: "0 auto",
      padding: "10px 10px",
    }}>
      <Stack
        spacing={4} 
        direction="row" 
        sx={{
          alignContent: "center",
          alignItems: "center",
          margin: "10px 0"
        }}
      >
        <img 
          src={logo} 
          alt="logo"
          style={{
            width: "90px",
            height: "90px",
            marginRight: "3rem",
            // margin: "15px 0",
          }}
        />
        <Stack
          spacing={6} 
          direction="row" 
          sx={{
            alignContent: "center",
            alignItems: "center",
            color: "GrayText"
          }}  
        >
          <hr style={{
            fontSize: "large",
            fontWeight: "bold",
            height: "50px",
            width: "2px",
          }}/>
          <Stack 
            spacing={4} 
            direction="row"
            sx={{
              fontSize: "large",

            }}
          >
            <Link to={'/discover'}>Discover</Link>
            <Link to={'/about'}>About Us</Link>
            <Link to={'/contact'}>Contact Us</Link>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        spacing={4}
        direction="row"
        sx={{
          alignContent: "center",
          alignItems: "center"
        }}
      >
          <InputBase
            sx={{
              ml: 1,
              bgcolor: 'background.paper',
              borderRadius: '20px',
              overflow: 'hidden',
              pl: 2,
              py: 0,
              border: 2,
              borderColor: (theme) => theme.palette.primary.dark,
              fontSize: '13px',
            }}
            placeholder="Search..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  size="small"
                  type="submit"
                  sx={{ bgcolor: (theme) => theme.palette.primary.dark }}
                >
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: 'primary.contrastText' }}
                  />
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            sx={{
              border: "1px solid",
              borderColor: (theme) => theme.palette.primary.main,
              borderRadius: "36px",
              fontSize: "large",
              color: (theme) => theme.palette.primary.main,
              padding: '8px 16px',
            }}
            onClick={() => alert("Login")}
          >Login</Button>
          
      </Stack>
    </Stack>
  )
}

export default NavMiniComponent