#include "mbed.h"
#include <string>

UnbufferedSerial pc(USBTX, USBRX);

int
main(int argc, char *argv[])
{
	string command;
	pc.baud(115200);
	pc.sync();
	printf("ready\r\n");
	while (1)
	{
		int c;
		c = getchar();
		if (c == '\n')
		{
			printf("%s\r\n", command.c_str());
			command = "";
			printf("ready\r\n");
		}
		else
		{
			command += c;
		}
	}
	return 0;
}
