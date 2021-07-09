#!/usr/bin/env python3
import sys
import serial
import random

if len(sys.argv) < 2:
	raise Exception('Please specify the serial port')

ser = serial.Serial(sys.argv[1], 115200)

print('Reset the target to begin the echo test')

while 1:
	line = ser.readline().decode('ascii')
	parts = line.split("\r\n")
	print('RECEIVED:', parts[0])
	if parts[0] == 'ready':
		# When DUT says b'ready\r\n', write 1-64 ASCII digits
		i = random.randint(1, 64)
		string = ''
		while i:
			i = i - 1
			string += str(random.randint(0, 9))
		print('SENDING: %s' % string)
		# don't forget the \r\n
		string += '\r\n'
		ser.write(string.encode('ascii'))
