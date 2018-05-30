/*global FB:true*/

import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_FAIL,
    GET_PHOTOS_SUCCESS
} from '../constants/Page';

function makeYearPhotos(photos, selectedYear) {
    let yearPhotos = [];

    photos.forEach((item) => {
        item.photos && item.photos.data.forEach((photo) => {
            let createdYear = new Date(photo.created_time).getFullYear();

            if (createdYear === selectedYear ) {
                yearPhotos.push(photo)
            }
        });
    });

    return yearPhotos;
}

function loadPhotos(year, dispatch) {
    FB.api(
        '/me?fields=albums{photos.limit(777){id,images,created_time}}&limit=777',
        function (response) {
            if (response) {
                if (response.error) {
                    return dispatch({
                        type: GET_PHOTOS_FAIL,
                        error: true,
                        payload: response.error
                    });
                }

                dispatch({
                    type: GET_PHOTOS_SUCCESS,
                    payload: makeYearPhotos(response.albums.data, year)
                });
            }
        }
    );
}

export function getPhotos(year) {
    return (dispatch) => {
        try {
            dispatch({
                type: GET_PHOTOS_REQUEST,
                payload: year
            });

            loadPhotos(year, dispatch);
        } catch(e) {
            dispatch({
                type: GET_PHOTOS_FAIL,
                error: true,
                payload: new Error(e)
            });
        }
    }
}