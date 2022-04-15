import React from "react";
import abc from "../../assets/abc.svg";
import logo from "../../assets/logo.svg";
import { HeaderPaper } from "../../styles/GlobalStyle";

function Header() {
  return (
    <HeaderPaper>
      <img
        src={abc}
        alt="abc product"
        style={{
          width: "18ch",
          height: "4ch",
          aspectRatio: "attr(width) / attr(height)",
        }}
      />
      <img
        src={logo}
        alt="highradius"
        style={{
          width: "18ch",
          height: "4ch",
          aspectRatio: "attr(width) / attr(height)",
        }}
      />
      <div style={{ width: "18ch" }} />
    </HeaderPaper>
  );
}

export default Header;
