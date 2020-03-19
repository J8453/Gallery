import { connect } from 'react-redux';
import { showCard, getAlbums, getImages } from '../actions';

import Form from '../components/Form';

const mapStateToProps = state => ({
  // cardIsShown: state.app.cardIsShown,
  formTitle: state.app.formTitle
})

// const mapDispatchToProps = dispatch => ({
// 	showCard: bool => dispatch(showCard(bool)),
// 	getAlbums: userId => dispatch(getAlbums(userId)),
// 	getImages: albumId => dispatch(getImages(albumId))
// })

export default connect(mapStateToProps, null)(Form)