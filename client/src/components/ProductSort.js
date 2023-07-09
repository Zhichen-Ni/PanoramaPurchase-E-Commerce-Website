import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

//onChange prop used
export default function ProductSort(props) {
  return (
    <div style={{ padding: 10, marginLeft: "auto", marginRight: 0 }}>
      <Nav>
        <NavDropdown
          id="nav-dropdown-dark-example"
          title="Sort"
          menuVariant="dark"
        >
          {props.sortOptions.map((sortingName, index) => (
            <NavDropdown.Item onClick={() => props.onSelect(index)} key={index}>
              {sortingName}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
    </div>
  );
};
