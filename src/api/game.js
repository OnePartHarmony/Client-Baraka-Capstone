import {apiUrl} from '../apiConfig'
import axios from 'axios'


export const createGame = (user) => {
	return axios({
		url: apiUrl + '/games',
		method: 'POST',
		data: {
			user: user
		},
	})
}

export const getGame = (user, gameId) => {
	return axios({
		url: apiUrl + `/games/${gameId}`,
		method: 'GET',
		data: {
			user: user
		},
	})
}