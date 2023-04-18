import React from 'react'
import './Header.css'
import ThumbUpOffAltSharpIcon from '@mui/icons-material/ThumbUpOffAltSharp';
import ThumbDownAltSharpIcon from '@mui/icons-material/ThumbDownAltSharp';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { IconButton } from '@mui/material';

function Header() {
  return (
    <div className="header">
      
    
    <Link to="/like">
      <IconButton>
          <ThumbUpOffAltSharpIcon className="header__icon" fontSize="large"/>
      </IconButton>
      </Link>

      <Link to="/">
      <img src="https://i.imgur.com/riJifQ3.png" className="header__logo"alt="logo" fontSize="large"/>
      </Link>

      <Link to="/dislike">

      <IconButton>
      < ThumbDownAltSharpIcon className="header__icon" fontSize="large"/>
      </IconButton>
      </Link>

    </div>
  )
}

export default Header