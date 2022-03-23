radio.setGroup(1)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
radio.onReceivedValue(function received(name: string, value: number) {
    let learned_serial: number;
    
    let remote_serial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (learning == 1) {
        if (name == "learn" && value == 1) {
            learned_serial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
            if (data_list.indexOf(learned_serial) < 0) {
                data_list.push(learned_serial)
            }
            
        }
        
    }
    
    for (let serialek of data_list) {
        if (remote_serial == serialek) {
            if (name == "alarm" && value == 1) {
                music.playTone(Note.C, 0)
            } else if (name == "alarm" && value == 0) {
                music.stopAllSounds()
            }
            
        }
        
    }
})
let my_serial = control.deviceSerialNumber()
let learning = 0
let data_list = [my_serial]
// alarm_sound_on
input.onButtonPressed(Button.A, function alarm_on() {
    radio.sendValue("alarm", 1)
})
// alarm_sound_off
input.onButtonPressed(Button.B, function alarm_off() {
    radio.sendValue("alarm", 0)
    music.stopAllSounds()
})
// prepinani_learn_on/off
input.onLogoEvent(TouchButtonEvent.LongPressed, function learn() {
    
    if (learning == 0) {
        learning = 1
    } else {
        learning = 0
    }
    
})
// posilani_learn
input.onLogoEvent(TouchButtonEvent.Pressed, function send_learn() {
    radio.sendValue("learn", 1)
})
