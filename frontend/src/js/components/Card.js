import React, { Component } from "react";
import Form from "../containers/Form";

class Card extends React.Component {  
	constructor(props) {
		super(props);
		this.cardElem = React.createRef();
	}

	sizeCardArea() {
        const contentArea = document.querySelector('.content');
        const cardArea = this.cardElem.current;

        let {
            offsetLeft: left,
            offsetWidth: width
        } = contentArea;
        let contentInfo = {
            left,
            width
        };
        cardArea.style.transform = `translateX(${contentInfo.left}px)`;
        cardArea.style.width = `${contentInfo.width}px`;
    }

    handleClose(e) {
        const { showCard } = this.props;
        const cardArea = this.cardElem.current;
        if (e.target===cardArea) showCard(false);
    }

    componentDidUpdate() {
    	if (this.cardElem.current) this.sizeCardArea();
        if (this.cardElem.current) window.addEventListener('resize', this.sizeCardArea.bind(this));
        if (!this.cardElem.current) window.removeEventListener('resize', this.sizeCardArea.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.sizeCardArea.bind(this));
    }

    render() {
    	// console.log('Card render');
    	// console.log(this.props);
    	const { cardIsShown } = this.props;
    	if (!cardIsShown) return null;
		return (
    		<div className="content card" ref={this.cardElem} onClick={this.handleClose.bind(this)}>
            	<Form />
        	</div>
    	)
    }
}

export default Card;
