let apiUrl
const apiUrls = {
    // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: '<replace_with_deployed_api_url>',
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

///////set up socket connection///////
import { io } from 'socket.io-client'

const socket = io('https://example.com', {
  path: '/baraka-socket/'
})


module.exports = { apiUrl, socket }
