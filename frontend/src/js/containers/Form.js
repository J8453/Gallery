import { connect } from 'react-redux';
import Form from '../components/Form';

const mapStateToProps = state => ({
  formTitle: state.app.formTitle
})

export default connect(mapStateToProps, null)(Form)