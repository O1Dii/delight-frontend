import {connect} from 'react-redux';
import {uploadImage} from '../actions/thunkActions';
import ImageUploadInput from '../components/ImageUploadInput/ImageUploadInput';

const mapStateToProps = state => ({
  authentication: state.getIn(['delight', 'authentication']),
  imageUploadInfo: state.getIn(['delight', 'imageUploadInfo'])
});

const mapDispatchToProps = {
  uploadImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUploadInput);