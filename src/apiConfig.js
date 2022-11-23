let apiUrl
const apiUrls = {
    // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: '<replace_with_deployed_api_url>',
	development: 'http://localhost:8000',
}

///////set up socket connection///////
const io = require("socket.io-client")


if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}


const socket = io(apiUrl, {
	path: '/baraka-socket/'
})



module.exports = {apiUrl, socket}
