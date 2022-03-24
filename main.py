radio.set_group(1)
radio.set_transmit_power(7)
radio.set_transmit_serial_number(True)
radio.on_received_value(received)
my_serial = control.device_serial_number()

learning = 0
list = [my_serial]


def received(name, value):
    global learning, data_list
    remote_serial = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)

    if learning == 1:
        if name == "learn" and value == 1:
            learned_serial = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
            if learned_serial not in data_list:
                data_list.append(learned_serial)

    for another_serial in list:
        if remote_serial == another_serial:
            if name == "alarm" and value == 1:
                music.play_tone(Note.C, 0)
            elif name == "alarm" and value == 0:
                music.stop_all_sounds()

#alarm_sound_on
def alarm_on():
    radio.sendValue("alarm", 1)
input.on_button_pressed(Button.A, alarm_on)

#alarm_sound_off
def alarm_off():
    radio.sendValue("alarm", 0)
    music.stop_all_sounds()
input.on_button_pressed(Button.B, alarm_off)

#prepinani_learn_on/off
def learn():
    global learning
    if learning == 0:
        learning = 1
    else:
        learning = 0
input.on_logo_event(TouchButtonEvent.LONG_PRESSED, learn)

#posilani_learn
def send_learn():
    radio.sendValue("learn", 1)
input.on_logo_event(TouchButtonEvent.PRESSED, send_learn)
