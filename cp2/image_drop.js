/**
 * create by Jocs at 2016-01-21
 */
const WEB_URL = 'ws://echo.websocket.org/echo'
const ws = new window.WebSocket(WEB_URL)

const log = message => console.log(message)
const handleFileDrop = (ws, file) => {
	const reader = new FileReader()
	reader.readAsArrayBuffer(file)
	reader.onload = () => {
		log(`sending: ${file.name}`)
		ws.readyState === 1 ? ws.send(reader.result): log(`did not connected yet`)
	}
}
(function() {
	setInterval(() => {
		log(ws.bufferedAmount)
	}, 1000)

})()
ws.addEventListener('open', () => {
	log('connected!')
})

ws.addEventListener('message', e => {
	//if(!e.data instanceof Blob) return
	const blob = e.data
	log(`message received: ${blob.size} bytes`)
	const uri = URL.createObjectURL(blob)
	let img = document.createElement('img')
	img.src = uri
	document.body.appendChild(img)
})

document.addEventListener('drop', e => {

	e.preventDefault()
	document.body.style.background = '#fff'
	const file = e.dataTransfer.files[0]
	handleFileDrop(ws, file)
	return false

})

document.addEventListener('dragover', e => {
	log(`enter`)
	e.preventDefault()
	document.body.style.background = 'yellow'
})

document.addEventListener('dragleave', e => {
	log(`leave`)
	e.preventDefault()
	document.body.style.background = '#fff'
})



