# 05-02: Host-Based Logging with Syslog

## Overview
Logging is essential for visibility into system activities. Syslog is the standard protocol for message logging in Linux and Unix-like systems. Centralizing these logs allows for efficient monitoring and analysis.

## Syslog Components
- **rsyslog**: A powerful and modular logging daemon commonly used in modern Linux distributions.
- **Facility**: Categorizes the source of the message (e.g., auth, cron, kern).
- **Severity**: Indicates the importance of the message (e.g., debug, info, warning, error, critical).

## Centralized Logging Architecture
In a centralized setup, client machines (log senders) forward their logs to a central syslog server (log receiver). This is typically achieved over UDP or TCP port 514.

### Server Configuration
To enable rsyslog to receive logs, the following modules must be enabled in `/etc/rsyslog.conf`:
- `imudp` for UDP reception.
- `imtcp` for TCP reception.

### Client Configuration
To forward logs to a remote server, a rule is added to the client's rsyslog configuration:
`*.* @192.168.1.100:514` (for UDP)
`*.* @@192.168.1.100:514` (for TCP)

## Security Considerations
Logs should be protected from unauthorized access and tampering. Using TCP with TLS (Syslog-over-TLS) is recommended for encrypting log traffic and ensuring delivery.
