import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
    return(
         
      <>
<div className="d-flex justify-content-center align-item-center">
<div className="content pt-5">
<h1 className="text-black fw-bold pt-5">404 Error</h1>
<p className="zoom-area fs-3"> Oops! Page is not Found </p>
<section className="error-container">
  <span>4</span>
  <span><span className="screen-reader-text">0</span></span>
  <span>4</span>
</section>
<div className="link-container">
  <Link  to="/" className="more-link">Home</Link>
</div>
</div>
</div>
      </>
    )
}