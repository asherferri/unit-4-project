changeLed = () => {
    let clicked = document.getElementById('switchOnOff')
        let socket3 = io.connect()
        if ( clicked.checked) {
            socket3.emit("pwm7", 1)
            console.log("on")
        } else {
        socket3.emit("pwm7", 0)
        console.log("off")
    }
}