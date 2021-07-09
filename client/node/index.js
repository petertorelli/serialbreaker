#!/usr/bin/env node
if (process.argv.length < 3) {
	console.error('Please specify the serial port');
	process.exit(-1);
}
const dev = process.argv[2];
const
	SerialPort = require('serialport'),
	Readline = require('@serialport/parser-readline'),
	ini = require('ini'),
	moment = require('moment');
const port = new SerialPort(dev, {
	autoOpen: false,
	baudRate: 115200,
});
const parser = new Readline({ delimiter: '\r\n' });
let rangex1 = 1
let rangex2 = 64
if (process.argv.length == 4) {
	rangex2 = parseInt(process.argv[3])
}
if (process.argv.length == 5) {
	rangex1 = parseInt(process.argv[3])
	rangex2 = parseInt(process.argv[4])
}
if (rangex1 > rangex2) {
    throw new Error('Start range may not exceed end range');
}

port.pipe(parser);
parser.on('data', data => {
	try {
		console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
		console.log("RECEIVED:", data);
		if (data == 'ready') {
			// When DUT says b'ready\r\n', write ASCII digits
			let i = parseInt(Math.random() * (1 + rangex2 - rangex1)) + rangex1;
			let string = '';
			while (i-- > 0) {
				string += parseInt(Math.random() * 9);
			}
			console.log("SENDING:", string);
			// don't forget the \r\n
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

process.on('SIGINT', () => {
	console.log('sigint');
	if (port.isOpen) {
		console.log('closing port');
		port.close();
	}
});
