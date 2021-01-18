import React from "react";
import preloader from "../../src/Preloader.gif";
const Spinner = () => (
  <div className="spinnerContainer">
    <img src={preloader} alt="preloader" className="spinner" />
  </div>
);
export default Spinner;
