I've been chasing a macOS bug for years where some embedded serial boards that use redirected IO through an on-board debugger crash the USB port when sending lots of data.

This repo contains a basic Arm-mbed application that echos a message, and both NodeJS and Python clients that send data to the target and wait for it to acknowledge receipt. This process continues in a loop until the USB port dies. I have not been able to crash Win10 or Ubuntu 18 (or 20), but macOS on some boards seems vulnerable. (e.g., I see this on ST boards but only when Mass Storage type is enabled.)

Usage:

```
% node index.js <serial port> [x2|x1 x2]
```

or

```
% main.py <serial port> [x2|x1 x2]
```

Where x1 is the fewest number of digits to send, and x2 is the largest number, defaulting to x1=1 and x2=64.

NOTE: This defaults to 115200 8/n/1 configuration.
