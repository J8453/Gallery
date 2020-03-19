import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import Nav from '../containers/Nav';
import UserPortrait from '../containers/UserPortrait';
import AlbumPortrait from '../containers/AlbumPortrait';

function Info(props) {
    return (
        <div className="info">
            <Nav />
            <Switch>
                <Route exact path='/user/:userId'>
                    <UserPortrait {...props} />
                </Route>
                <Route path='/user/:userId/album/:albumId'>
                    <AlbumPortrait {...props} />
                </Route>
            </Switch>
        </div>
    )
}

export default Info
