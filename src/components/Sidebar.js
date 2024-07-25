import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ links, activeLink }) => {
  return (
    <Nav
      className="flex flex-column"
      style={{
        width: "250px",
        height: "calc(100.7vh - 60px)",
        background: "#111926",
      }}
    >
      {links.map((link, index) => (
        <Nav.Link
          key={index}
          href={link.href}
          active={link.text === activeLink}
          style={{ color: "black" }}
        >
          {link.text}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
