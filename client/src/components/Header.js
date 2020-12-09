// Import Modules
import React from "react";
import { Link, NavLink } from "react-router-dom";

// Import Components
import SavedList from "../Movies/SavedList";

export default function Header({ savedList }) {
  return (
    <header>
      <div className='top-header'>
        <div id='logo'>
          <h1>
            <Link to='/'>
              Rick<span>Box</span>
            </Link>
          </h1>
        </div>

        <nav>
          <NavLink exact to='/' activeClassName='active'>
            Home
          </NavLink>
          <NavLink to='/add-movie'>Add Movie</NavLink>
        </nav>
      </div>

      <div className='bottom-header'>
        <SavedList list={savedList} />
      </div>
    </header>
  );
}
