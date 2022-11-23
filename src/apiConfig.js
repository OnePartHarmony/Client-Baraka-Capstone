let apiUrl
const apiUrls = {
    // YOU MUST CHANGE PRODUCTION URL WHEN DEPLOYING
	production: '<replace_with_deployed_api_url>',
	development: 'http://localhost:8000',
}

///////set up socket connection///////
const {io} = require("socket.io-client")


if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}


const socket = io(apiUrl, {
	path: '/baraka-socket/'
	// auth: {
	// 	token: "abc"
	// }
})


socket.on("connect", () => {
	console.log("connected", socket.id)
})
  
socket.on('woohoo', (arg) => {
	console.log(arg.message)
} )

socket.on("disconnect", () => {
	console.log("disconnected", socket.id)
})


module.exports = {apiUrl, socket}
