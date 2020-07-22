import {createAction} from 'redux-actions';

export const setPlaying = createAction('SET_PLAYING');
export const setCurrentPlayingTime = createAction('SET_CURRENT_PLAYING_TIME');
export const setCurrentTrack = createAction('CHANGE_CURRENT_TRACK');
export const setPlaylistVisibility = createAction('SET_PLAYLIST_VISIBILITY');
export const setCurrentPlaylist = createAction('SET_CURRENT_PLAYLIST');
export const setCurrentShowingPlaylist = createAction('SET_CURRENT_SHOWING_PLAYLIST');
export const setCurrentArtistsList = createAction('SET_CURRENT_ARTISTS_LIST');
export const setCurrentGenresList = createAction('SET_CURRENT_GENRES_LIST');
export const setCurrentTrackInfo = createAction('SET_CURRENT_TRACK_INFO');

export const requestPosts = createAction('REQUEST_POSTS');
export const receivePosts = createAction('RECEIVE_POSTS');
export const errorPosts = createAction('ERROR_POSTS');

export const requestedUser = createAction('REQUESTED_USER');
export const receiveUser = createAction('RECEIVE_USER');
export const errorUser = createAction('ERROR_USER');

export const requestToken = createAction('REQUESTED_TOKEN');
export const receiveToken = createAction('RECEIVE_TOKEN');
export const errorToken = createAction('ERROR_TOKEN');

export const requestRegistration = createAction('REQUESTED_REGISTRATION');
export const receiveRegistration = createAction('RECEIVE_REGISTRATION');
export const errorRegistration = createAction('ERROR_REGISTRATION');

export const requestAddPost = createAction('REQUESTED_ADD_POST');
export const receiveAddPost = createAction('RECEIVE_ADD_POST');
export const errorAddPost = createAction('ERROR_ADD_POST');

export const requestSubmitTrack = createAction('REQUESTED_SUBMIT_TRACK');
export const receiveSubmitTrack = createAction('RECEIVE_SUBMIT_TRACK');
export const errorSubmitTrack = createAction('ERROR_SUBMIT_TRACK');

export const requestPlaylists = createAction('REQUESTED_PLAYLISTS');
export const receivePlaylists = createAction('RECEIVE_PLAYLISTS');
export const errorPlaylists = createAction('ERROR_PLAYLISTS');

export const requestImageUpload = createAction('REQUESTED_IMAGE_UPLOAD');
export const receiveImageUpload = createAction('RECEIVE_IMAGE_UPLOAD');
export const errorImageUpload = createAction('ERROR_IMAGE_UPLOAD');

export const requestSongUpload = createAction('REQUESTED_SONG_UPLOAD');
export const receiveSongUpload = createAction('RECEIVE_SONG_UPLOAD');
export const errorSongUpload = createAction('ERROR_SONG_UPLOAD');

export const incrUpdateCounter = createAction('INCR_UPDATE_COUNTER');

export const updateUser = createAction('UPDATE_USER');
export const updateFavorites = createAction('UPDATE_FAVORITES');
