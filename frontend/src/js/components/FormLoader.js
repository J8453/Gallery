import React, { Component } from "react";
import '../../css/loader.css';

function FormLoader(props) {
    return (
        <div className="loaderContainer">
        	<div className="loader">
			  <div></div>
			  <div></div>
			  <div></div>
			</div>
			<div className="fontCourier">uploading! just a sec!</div>
        </div>
    )
}

export default FormLoader
