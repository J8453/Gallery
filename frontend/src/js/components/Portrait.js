import React, { Component } from "react";
import { withRouter } from "react-router";

class Portrait extends React.Component {
  render() {
    // console.log('Info render');
    // console.log(this.props);
    const { 
        maskText,
        maskCallback,
        editCallback,
        btnText,
        btnCallback,
        coverSrc,
        title,
        description,
        isLoggedIn,
        currentUser } = this.props;
    const { userId: owner } = this.props.match.params;
    console.log('currentUser: ', currentUser.id, 'owner: ', owner);

    return (
        <div className="info__portrait">
            <div className="info__portrait--coverContainer">
                <img className="info__portrait--cover" src={coverSrc} alt="" />
                { isLoggedIn && owner==currentUser.id && <div className="info__portrait--cover mask" onClick={maskCallback}>{maskText}</div> }
            </div>
            <div className="info__portrait--introduction">
                { isLoggedIn && owner==currentUser.id && <span className="editIcon pointer" onClick={editCallback}>🖊</span> }
                <h1 className="info__portrait--title">{title}</h1>
                <p className="info__portrait--description">{description}</p>
            </div>
            { isLoggedIn && owner==currentUser.id &&
                <div className="buttons">
                    <button className="btn" id="functionalBtn" onClick={btnCallback}>{btnText}</button>
                </div>
            }
        </div>
    )
  }
}

const PortraitWithRouter = withRouter(Portrait);

export default PortraitWithRouter
