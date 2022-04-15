import { Typography } from "@mui/material";
import React from "react";
import { FooterPaper } from "../../styles/GlobalStyle";

function Footer() {
  return (
    <FooterPaper>
      <Typography variant="body2">
        ©️ Copyright 2022 Highradius. All Rights Reserved
      </Typography>
    </FooterPaper>
  );
}

export default Footer;
