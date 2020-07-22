import * as requests from '../requests';
import {API_URL} from '../constants';
import {
    errorAddPost,
    errorImageUpload,
    errorPlaylists,
    errorPosts,
    errorRegistration,
    errorSongUpload,
    errorSubmitTrack,
    errorToken,
    errorUser,
    incrUpdateCounter,
    receiveAddPost,
    receiveImageUpload,
    receivePlaylists,
    receivePosts,
    receiveRegistration,
    receiveSongUpload,
    receiveSubmitTrack,
    receiveToken,
    receiveUser,
    requestAddPost,
    requestedUser,
    requestImageUpload,
    requestPlaylists,
    requestPosts,
    requestRegistration,
    requestSongUpload,
    requestSubmitTrack,
    requestToken,
    setCurrentArtistsList,
    setCurrentGenresList,
    setCurrentShowingPlaylist,
    setCurrentTrackInfo,
    updateFavorites,
    updateUser
} from "./index";


export const requestFavorites = () => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);
    const id = getStore().getIn(['delight', 'authentication', 'data', 'id']);

    try {
        const response = await requests.GET(API_URL + `api/user/${id}/playlist/`, {
            search: 'Избранное'
        }, token);

        if (!response.ok) {
            throw 'error';
        }

        const json = await response.json();

        dispatch(updateFavorites(json));
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const requestUpdateUser = token => async (dispatch) => {
    try {
        const response = await requests.GET(API_URL + `auth/me/`, undefined, token);
        const json = await response.json();

        dispatch(updateUser(json));
        dispatch(requestFavorites());
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const getPosts = (id, page, onlyUser) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data']).token;
    dispatch(requestPosts());

    try {
        const finalId = id || -1;
        const response = await requests.GET(API_URL + `api/user/${finalId}/post/`,
            onlyUser ? {search: id} : undefined,
            token);
        const json = await response.json();

        if (!response.ok) {
            throw 'error';
        }

        dispatch(receivePosts(json));
    } catch (errorMessage) {
        console.error(errorMessage);
        dispatch(errorPosts(errorMessage));
    }
};

export const getPlaylists = (id) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data']).token;
    dispatch(requestPlaylists());

    try {
        const finalId = id || -1;
        const response = await requests.GET(API_URL + `api/user/${finalId}/playlist/`, undefined, token);
        const json = await response.json();

        if (!response.ok) {
            throw 'error';
        }

        dispatch(receivePlaylists(json));
    } catch (errorMessage) {
        dispatch(errorPlaylists(errorMessage));
    }
};

export const getPlaylist = (ownerId, playlistId) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data']).token;

    try {
        const response = await requests.GET(API_URL + `api/user/${ownerId}/playlist/${playlistId}/`, undefined, token);

        if (!response.ok) {
            throw json;
        }

        const json = await response.json();

        dispatch(setCurrentShowingPlaylist(json));
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const getArtists = () => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);

    try {
        const response = await requests.GET(API_URL + `api/artist/`, undefined, token);

        if (!response.ok) {
            throw json;
        }

        const json = await response.json();

        dispatch(setCurrentArtistsList(json));
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const getGenres = () => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);

    try {
        const response = await requests.GET(API_URL + `api/genre/`, undefined, token);

        if (!response.ok) {
            throw json;
        }

        const json = await response.json();

        dispatch(setCurrentGenresList(json));
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const loadTrackInfo = (id) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);

    try {
        const response = await requests.GET(API_URL + `api/song/${id}/`, undefined, token);

        if (!response.ok) {
            throw json;
        }

        const json = await response.json();

        dispatch(setCurrentTrackInfo(json));
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const likeTrack = (id) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);

    try {
        const response = await requests.POST(API_URL + `api/song/${id}/like/`, undefined, token);

        if (!response.ok) {
            throw "error";
        }
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const dislikeTrack = (id) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);

    try {
        const response = await requests.DELETE(API_URL + `api/song/${id}/like/`, token);

        if (!response.ok) {
            throw "error";
        }
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const requestUser = id => async (dispatch) => {
    dispatch(requestedUser);

    try {
        const response = await requests.GET(API_URL + `api/user/${id}/`);
        const json = await response.json();

        dispatch(receiveUser(json));
    } catch (errorMessage) {
        dispatch(errorUser(errorMessage));
    }
};

export const logOut = token => async (dispatch) => {
    try {
        const logInResponse = await requests.POST(API_URL + `auth/logout/`, undefined, token);

        dispatch(errorToken());
        dispatch(saveAuthenticationData({}));
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const saveAuthenticationData = data => async (dispatch) => {
    localStorage.setItem('auth', JSON.stringify(data));
};

export const loadAuthenticationData = () => async (dispatch) => {
    const existingTokens = JSON.parse(localStorage.getItem('auth'));

    if (existingTokens && existingTokens.token && existingTokens.id) {
        dispatch(receiveToken(existingTokens));
        dispatch(requestUpdateUser(existingTokens.token));
    } else {
    }
};

export const authenticate = (username, password) => async (dispatch) => {
    dispatch(requestToken);

    try {
        const logInResponse = await requests.POST(API_URL + `auth/login/`,
            {
                username: username,
                password: password
            });
        const logInJson = await logInResponse.json();

        if (!logInResponse.ok) {
            throw logInJson;
        }

        dispatch(receiveToken(logInJson));
        dispatch(saveAuthenticationData(logInJson));
        dispatch(requestUpdateUser(logInJson.token));
    } catch (errorMessage) {
        console.error(errorMessage);
        dispatch(errorToken(errorMessage));
    }
};

export const register = (username, email, password) => async (dispatch) => {
    dispatch(requestRegistration());

    try {
        const response = await requests.POST(API_URL + `auth/registration/`,
            {
                username: username,
                email: email,
                password: password
            });
        const json = await response.json();

        if (!response.ok) {
            throw json;
        }

        dispatch(receiveRegistration(json));
        dispatch(authenticate(username, password));
    } catch (errorMessage) {
        console.error(errorMessage);
        dispatch(errorRegistration(errorMessage));
    }
};

export const followUser = (token, idToFollow) => async (dispatch) => {
    try {
        const response = await requests.POST(API_URL + `api/user/${idToFollow}/like/`, undefined, token);

        dispatch(requestUpdateUser(token));
    } catch (errorMessage) {
    }
};

export const stopFollowingUser = (token, idToFollow) => async (dispatch) => {
    try {
        const response = await requests.DELETE(API_URL + `api/user/${idToFollow}/like/`, token);

        dispatch(requestUpdateUser(token));
    } catch (errorMessage) {
    }
};

export const addPost = (token, id, data) => async (dispatch) => {
    dispatch(requestAddPost());

    try {
        const response = await requests.POST(API_URL + `api/user/${id}/post/`, data, token);
        const json = await response.json();

        dispatch(receiveAddPost());
    } catch (errorMessage) {
        dispatch(errorAddPost(errorMessage));
    }
};

export const submitTrack = (data) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);
    dispatch(requestSubmitTrack());

    try {
        const response = await requests.POST(API_URL + `api/song/`, data, token);
        const json = await response.json();

        if (!response.ok) {
            throw 'error';
        }

        dispatch(receiveSubmitTrack(json));
    } catch (errorMessage) {
        dispatch(errorSubmitTrack(errorMessage));
    }
};

export const removeTrackFromPlaylist = (trackId, playlistId) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);
    const id = getStore().getIn(['delight', 'authentication', 'data', 'id']);

    try {
        const response = await requests.DELETE(
            API_URL + `api/user/${id}/playlist/${playlistId}/song/${trackId}/`,
            token
        );

        if (!response.ok) {
            throw response;
        }

        const json = await response.json();
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const addTrackToPlaylist = (trackId, playlistId) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);
    const id = getStore().getIn(['delight', 'authentication', 'data', 'id']);

    try {
        const response = await requests.POST(
            API_URL + `api/user/${id}/playlist/${playlistId}/song/`, {songs: [trackId]},
            token
        );

        if (!response.ok) {
            throw response;
        }

        const json = await response.json();
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const createPlaylist = (name) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data']).token;
    const id = getStore().getIn(['delight', 'authentication', 'data']).id;

    try {
        const response = await requests.POST(API_URL +
            `api/user/${id}/playlist/`
            , {
                name,
                owner: id
            }, token);

        if (!response.ok) {
            throw response;
        }

        const json = await response.json();

        dispatch(setCurrentShowingPlaylist(json));
    } catch (errorMessage) {
        console.error(errorMessage);
    }
};

export const updatePlaylistInfo = (playlistId, data) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);
    const ownerId = getStore().getIn(['delight', 'authentication', 'data', 'id']);

    try {
        const response = await requests.PUT(API_URL +
            `api/user/${ownerId}/playlist/${playlistId}/`, data, token);

        if (!response.ok) {
            throw response;
        }
    } catch
        (errorMessage) {
        console.error(errorMessage);
    }
};

export const uploadImage = (file, type, token) => async (dispatch) => {
    dispatch(requestImageUpload());
    const data = new FormData();
    data.append('file', file);
    data.append('type', type);

    try {
        const response = await requests.POST(API_URL + `upload/`, data, token, true);

        if (!response.ok) {
            throw 'huinya';
        }

        const json = await response.json();

        dispatch(receiveImageUpload(json));
    } catch (errorMessage) {
        console.error(errorMessage);
        dispatch(errorImageUpload());
    }
};

export const uploadSong = (file, type) => async (dispatch, getStore) => {
    const token = getStore().getIn(['delight', 'authentication', 'data', 'token']);
    dispatch(requestSongUpload());
    const data = new FormData();
    data.append('file', file);
    data.append('type', type);

    try {
        const response = await requests.POST(API_URL + `upload/`, data, token, true);

        if (!response.ok) {
            throw 'huinya';
        }

        const json = await response.json();

        dispatch(receiveSongUpload(json));
    } catch (errorMessage) {
        console.error(errorMessage);
        dispatch(errorSongUpload());
    }
};

export const autoIncreasingUpdateCounter = () => async (dispatch) => {
    setTimeout(dispatch(incrUpdateCounter()), 180000);
};