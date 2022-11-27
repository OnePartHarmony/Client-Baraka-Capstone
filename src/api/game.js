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