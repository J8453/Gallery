import { connect } from 'react-redux';
import { showCard } from '../actions';

import Card from '../components/Card';

const mapStateToProps = state => ({
  cardIsShown: state.app.cardIsShown,
  formTitle: state.app.formTitle
})

const mapDispatchToProps = dispatch => ({
	showCard: bool => dispatch(showCard(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)