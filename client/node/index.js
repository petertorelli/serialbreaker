#!/usr/bin/env node
if (process.argv.length !== 3) {
	console.error('Please specify the serial port');
	process.exit(-1);
}
const dev = process.argv[2];
const
	SerialPort = require('serialport'),
	Readline = require('@serialport/parser-readline'),
	ini = require('ini');
//const port = new SerialPort('/dev/tty.usbmodem14414303', {
const port = new SerialPort(dev, {
	autoOpen: false,
	baudRate: 115200,
});
const parser = new Readline({ delimiter: '\r\n' });
port.pipe(parser);
parser.on('data', data => {
	try {
		console.log(data);
		if (data == 'ready') {
			let i = parseInt(Math.random() * 63) + 1;
			let string = '';
			while (i--) {
				string += parseInt(Math.random() * 9);
			}
			//string = 'x';
			console.log("SENDING:", string);
			string += '\r\n';
			port.write(string);
		}
	} catch (error) {
		console.error(error);
		port.close();
	}
});
port.on('error', error => {
	console.error(error);
});
port.on('close', error => {
	console.log('port close event');
})
port.on('open', () => {
	console.log('port open event');
})
port.open(error => {
	if (error) {
		console.error('Error opening serialport');
		console.error(error);
	} else {
		console.log('Reset the target to begin the echo test');
	}
});

//process.on('unhandledExceptio')
process.on('SIGINT', () => {
	console.log('sigint');
	if (port.isOpen) {
		console.log('closing port');
		port.close();
	}
});