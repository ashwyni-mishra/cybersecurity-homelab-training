# 05-02: Host-Based Logging with Syslog

## What is it used for?
Syslog is a standard protocol used for message logging on Unix-like operating systems. It provides a systematic way for the kernel, services, and applications to generate and store records of their activity. It is primarily used to:
*   **Audit Activity**: Tracking user logins, `sudo` commands, and system changes.
*   **Troubleshoot**: Identifying the root cause of service failures or kernel panics.
*   **Security Monitoring**: Detecting brute-force attacks, unauthorized access, and lateral movement by attackers.
*   **Centralization**: Consolidation of logs from multiple hosts into a single SIEM (Security Information and Event Management) system for unified analysis.

## Techniques
### Log Severity Levels
Syslog categorizes messages into 8 levels, which allows administrators to filter logs based on their importance:
0.  **Emergency**: System is unusable (e.g., kernel panic).
1.  **Alert**: Immediate action required.
2.  **Critical**: Critical conditions.
3.  **Error**: Non-critical error conditions.
4.  **Warning**: Warning conditions.
5.  **Notice**: Normal but significant conditions.
6.  **Informational**: Standard informational messages.
7.  **Debug**: Detailed output for debugging purposes.

### Facilities
Syslog also uses "facilities" to categorize the source of the message (e.g., `auth`, `cron`, `kern`, `mail`, `user`).

### Remote Log Forwarding
Sending local logs to a remote collector (like a Wazuh manager or ELK stack) ensures that even if an attacker gains root access and wipes local logs, the record of their activity is preserved elsewhere.

## How those techniques are used
*   **Brute-Force Detection**: Security tools monitor `auth.log` for "Failed password" strings. If multiple failures occur from the same IP, an alert is triggered.
*   **Kernel Auditing**: Administrators check `kern.log` to identify hardware failures or low-level system issues.
*   **Compliance and Retention**: Organizations use log rotation (via `logrotate`) to ensure logs are kept for a specific period (e.g., 90 days) without filling up the disk.

## Commands used

### Local Log Analysis
```bash
# Watch authentication logs in real-time (essential during an active attack)
sudo tail -f /var/log/auth.log

# Search for specific failed login attempts by a user
grep "Failed password for root" /var/log/auth.log

# View recent system messages captured by systemd-journald
journalctl -n 50

# Follow logs for a specific service (e.g., SSH)
journalctl -u ssh -f
```

### Configuring Remote Forwarding (rsyslog)
To ship logs to a remote SIEM server:
1.  Open the configuration file: `sudo nano /etc/rsyslog.conf`
2.  Add the forwarding rule at the end of the file:
    ```text
    # Send all logs (*.*) to the SIEM IP via UDP (514)
    *.* @192.168.1.100:514

    # Use @@ for TCP forwarding (more reliable)
    *.* @@192.168.1.100:514
    ```
3.  Restart the service to apply changes:
    ```bash
    sudo systemctl restart rsyslog
    ```

## Summary
Host-based logging is a critical component of the "Detection" pillar in security. By understanding syslog severity levels, facilities, and how to forward logs to a central location, you ensure that your environment remains transparent and that attacker activity can be traced even after they attempt to cover their tracks.

## Reference links
- [rsyslog Official Documentation](https://www.rsyslog.com/doc/index.html)
- [Systemd Journalctl Guide](https://www.man7.org/linux/man-pages/man1/journalctl.1.html)
- [NIST: Guide to Computer Security Log Management (SP 800-92)](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf)
- [Common Linux Log Files Explained](https://linuxconfig.org/important-linux-log-files-every-admin-should-know)

## Next Lesson
[Next Lesson: 05-03 - Network Traffic Analysis with tcpdump](/lessons/module-5/05-03-network-traffic-analysis-with-tcpdump)
