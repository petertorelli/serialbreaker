I've been chasing a macOS bug for years where some embedded serial boards that use redirected IO through an on-board debugger crash the USB port when sending lots of data.

This repo contains a basic Arm-mbed application that echos a message, and both NodeJS and Python clients that send data to the target and wait for it to acknowledge receipt.
