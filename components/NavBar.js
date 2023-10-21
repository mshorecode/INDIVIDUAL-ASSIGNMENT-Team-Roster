/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Nav, Button, Form, Col,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect id="navbar" expand="lg" variant="dark">
      <Link passHref href="/">
        <Navbar.Brand id="logo">ACC Football</Navbar.Brand>
      </Link>
      <Nav className="me-auto">
        {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
        <Link passHref href="/team">
          <Nav.Link>Team</Nav.Link>
        </Link>
        <Link passHref href="/player/new">
          <Nav.Link>Create Player</Nav.Link>
        </Link>
      </Nav>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Search"
          className="search"
        />
      </Col>
      <Button id="logout" variant="danger" onClick={signOut}>Sign Out</Button>
    </Navbar>
  );
}
