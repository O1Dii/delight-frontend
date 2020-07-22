import {connect} from 'react-redux';
import {incrUpdateCounter} from '../actions';
import {getPosts, getPlaylists} from '../actions/thunkActions';
import HomePage from '../components/HomePage/HomePage';

const mapStateToProps = state => ({
  authentication: state.getIn(['delight', 'authentication']),
  posts: state.getIn(['delight', 'posts']),
  updateCounter: state.getIn(['delight', 'updateCounter']),
  playlists: state.getIn(['delight', 'playlists'])
});

const mapDispatchToProps = {
  getPosts,
  getPlaylists,
  incrUpdateCounter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);