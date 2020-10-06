let socket2 = io.connect() 
gpioON2 = () => {
    socket2.emit("pwm14", 1) 
}
gpioOFF2 = () => {
    socket2.emit("pwm14", 0) 
}

let socket3 = io.connect()
gpioON3 = () => {
    socket3.emit("pwm7", 1) 
}
gpioOFF3 = () => {
    socket3.emit("pwm7", 0) 
}

// let socketA = io.connect() 
// gpioONA = () => {
//     socketA.emit("stateA", 1) 
// }
// gpioOFFA = () => {
//     socketA.emit("stateA", 0) 
// }

changeLed = () => {
    let clicked = document.getElementById('switchOnOff')
        let socket = io.connect()
        if ( clicked.checked) {
            socket.emit("pwm18", 1)
            console.log("on GPIO18")
        } else {
        socket.emit("pwm18", 0)
        console.log("off GPIO18")
    }
}