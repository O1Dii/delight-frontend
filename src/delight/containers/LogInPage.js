import {connect} from 'react-redux'
import {requestToken} from '../actions';
import {authenticate} from '../actions/thunkActions';
import LogInPage from "../components/LogInPage/LogInPage";

const mapStateToProps = (state) => ({
  authentication: state.getIn(['delight', 'authentication'])
})

const mapDispatchToProps = {authenticate, requestToken}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogInPage)