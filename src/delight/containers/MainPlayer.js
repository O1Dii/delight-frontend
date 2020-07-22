import {connect} from 'react-redux';
import {
    setCurrentPlayingTime,
    setCurrentShowingPlaylist,
    setCurrentTrack,
    setPlaying,
    setPlaylistVisibility
} from '../actions';
import {addTrackToPlaylist, likeTrack, loadTrackInfo} from '../actions/thunkActions';
import MainPlayer from '../components/MainPlayer/MainPlayer';

const mapStateToProps = state => ({
    playing: state.getIn(['delight', 'playing']),
    playlist: state.getIn(['delight', 'currentTracksList']),
    trackIndex: state.getIn(['delight', 'currentTrack']),
    tracksListVisibility: state.getIn(['delight', 'isPlaylistVisible']),
    currentTime: state.getIn(['delight', 'currentPlayingTime']),
    playlists: state.getIn(['delight', 'playlists']),
    fullTrackInfo: state.getIn(['delight', 'currentTrackInfo']),
    authentication: state.getIn(['delight', 'authentication'])
});

const mapDispatchToProps = {
    setPlaying,
    setCurrentPlayingTime,
    setCurrentShowingPlaylist,
    setCurrentTrack,
    setPlaylistVisibility,
    loadTrackInfo,
    likeTrack,
    addTrackToPlaylist
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPlayer);