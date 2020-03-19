import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Window from "../containers/Window";
import Info from "../components/Info";
import Album from "../containers/Album";
import Card from "../containers/Card";

function AlbumPage() {
	return (
		<div className="container">
			<Window />
			<Info
				maskText="Update Album Cover"
				editText="Edit Album Info"
				btnText="Add Photos" />
			<Album />
			<Card />
		</div>
	)
}

export default AlbumPage



