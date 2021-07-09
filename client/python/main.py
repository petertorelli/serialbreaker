#!/usr/bin/env python3
import sys
import serial
import random
import datetime

if len(sys.argv) < 2:
	raise Exception('Please specify the serial port')

ser = serial.Serial(sys.argv[1], 115200)

rangex1 = 1
rangex2 = 64

if len(sys.argv) == 3:
	rangex2 = int(sys.argv[2])
if len(sys.argv) == 4:
	rangex1 = int(sys.argv[2])
	rangex2 = int(sys.argv[3])
if rangex1 > rangex2:
	raise Exception('Start range may not exceed end range')

print('Reset the target to begin the echo test')

while 1:
	line = ser.readline().decode('ascii')
	parts = line.split("\r\n")
	print(datetime.datetime.today().strftime("%Y-%m-%d %H:%M:%S"))
	print('RECEIVED:', parts[0])
	if parts[0] == 'ready':
		# When DUT says b'ready\r\n', write ASCII digits
		i = random.randint(rangex1, rangex2)
		string = ''
		while i:
			i = i - 1
			string += str(random.randint(0, 9))
		print('SENDING: %s' % string)
		# don't forget the \r\n
		string += '\r\n'
		ser.write(string.encode('ascii'))
