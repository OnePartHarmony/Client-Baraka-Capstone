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
const {io} = require("socket.io-client")

const socket = io(apiUrl, {
	path: '/baraka-socket/'
})

//log all socket connections with a catch-all listener for testing
socket.onAny((event, ...args) => {
	console.log(event, args);
})

socket.on("connect", () => {
	console.log("connected", socket.id)
})

socket.on('woohoo', (arg) => {
	console.log(arg.message)
} )


module.exports = {apiUrl, socket}
