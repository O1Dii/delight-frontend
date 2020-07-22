import {connect} from 'react-redux';
import NavigationPanel from '../components/NavigationPanel/NavigationPanel';
import {logOut} from '../actions/thunkActions';

const mapStateToProps = state => ({
  authentication: state.getIn(['delight', 'authentication'])
});

const mapDispatchToProps = {
  logOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationPanel);