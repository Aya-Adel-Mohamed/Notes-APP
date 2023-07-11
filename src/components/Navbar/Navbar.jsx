import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  let { userData, logOut } = props;
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-nav py-3 navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-white fs-3 px-3" to="/"><i class="fa-solid fa-note-sticky me-3"></i>Notes</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData ? <>  <li className="nav-item">
                <span className="nav-link text-white cursor" onClick={logOut}>Logout</span>
              </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold " to='profile'>{userData.name}<i className='ms-2 fa-solid fa-user'></i></Link>
                </li>
              </> : <>
                <li className="nav-item">
                  <Link className="nav-link text-white " to="login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white " to="register">Register</Link>
                </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}