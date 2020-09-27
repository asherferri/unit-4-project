//GPIo control module
const Gpio = require('onoff').Gpio
//each instance creates control for each GPIO pin
  //GPIO 18
const GPIOpin = new Gpio(18, 'out')
  //GPIO 14
const GPIOpin2 = new Gpio(14, 'out')
  //GPIO 7
const GPIOpin3 = new Gpio(7, 'out')
//I used FileSystem module to read the HTML
const fs = require('fs')

const http = require('http').createServer(
  handler = (req, res) => {
    fs.readFile(__dirname + '/index.html',
    //passes /index.html and reads it
    (err, data) => {
      console.log(__dirname)
        //allocation of what's passed \m/ this was a HxCx moment \m/
        console.log(data)
        if (err) {
          res.writeHead(500)
            return res.end("Can't find the damn index dude! so dont expect the socket to load \\m/")
        }
    res.writeHead(200)
    res.end(data)
  })
})

//Socket.io module for bidirectional comunication \m/
const io = require('socket.io')(http)

//listen to port 7777 one of my favorite parts \m/
const PORT = process.env.PORT || 7777
  http.listen(PORT, () => {
    console.log(`Listening to Granars Vag - By Finntroll on port ${PORT}`)
})

//connects to Websocket
io.sockets.on('connection', (socket) => {
  //stores initial state
  let buttonState = 0
  //reads the pwm from client
  socket.on('pwm18', (data) => {
    buttonState = data
    //gpio pulse changes if button pwm changes
    if (buttonState != GPIOpin.readSync()) {
      //turns GPIO ON or OFF
      GPIOpin.writeSync(buttonState)
    }
  })
})

io.sockets.on('connection', (socket2) => {
  let buttonState = 0
  socket2.on('pwm14', (data) => {
    buttonState = data
    if (buttonState != GPIOpin2.readSync()) {
      GPIOpin2.writeSync(buttonState)
    }
  })
})

io.sockets.on('connection', (socket3) => {// WebSocket Connection
  let buttonState = 0 //variable to store button state

  socket3.on('pwm7', (data) => { //get button state from client
    buttonState = data
    if (buttonState != GPIOpin3.readSync()) { //Change LED state if button state is changed
      GPIOpin3.writeSync(buttonState) //turn LED on or off
    }
  })
})
