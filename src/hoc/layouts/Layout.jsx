import React from 'react';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';

export default function Layout({ component: Component, route, ...props }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-faded">
        <NavLink className="navbar-brand" to="/">
          {'Chat'}
        </NavLink>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                {'Home'}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <Route route={route} render={() => <Component {...props} />} />
      </div>
      <footer className="align-items-end">
        <div className="container-fluid">Footer</div>
      </footer>
    </>
  );
}