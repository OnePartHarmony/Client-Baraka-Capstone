import {apiUrl} from '../apiConfig'
import axios from 'axios'


export const getGame = (user, gameId) => {
	return axios({
		url: apiUrl + `/games/${gameId}`,
		method: 'GET',
		data: {
			user: user
		},
	})
}


export const createGame = (user, playerCount) => {
	return axios({
		url: apiUrl + '/games',
		method: 'POST',
		data: {
			user: user,
			game: {
				numberOfPlayers: playerCount
			}
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}
