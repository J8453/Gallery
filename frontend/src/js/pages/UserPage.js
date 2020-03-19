import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Window from "../containers/Window";
import Info from "../components/Info";
import Catalog from "../containers/Catalog";
import Card from "../containers/Card";

function UserPage() {
	return (
		<div className="container">
			<Window />
			<Info 
				maskText="Update Avatar"
				editText="Edit Personal Info"
				btnText="Create a New Album" />
			<Catalog />
			<Card />
		</div>
	)
}

export default UserPage



