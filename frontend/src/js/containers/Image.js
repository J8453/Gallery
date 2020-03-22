import { connect } from 'react-redux';
import { reviseSelectedIdArr, updateSingleSelectedId, previewPortrait } from '../actions';

import Image from '../components/Image';

const mapStateToProps = state => ({
  isSelectMode: state.album.isSelectMode,
  isSingleSelect: state.album.isSingleSelect,
  singleSelectedId: state.album.singleSelectedId,
})

const mapDispatchToProps = dispatch => ({
  reviseSelectedIdArr: imageId => dispatch(reviseSelectedIdArr(imageId)),
  updateSingleSelectedId: imageId => dispatch(updateSingleSelectedId(imageId)),
  previewPortrait: imageId => dispatch(previewPortrait(imageId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)