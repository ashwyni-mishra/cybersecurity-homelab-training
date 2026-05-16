# 05-09: Detecting Web Attacks in Logs

## Overview
Web applications are frequent targets for attackers. Monitoring web server logs (Apache, Nginx) is crucial for detecting attacks like SQL Injection (SQLi) and Remote Code Execution (RCE).

## Log Formats
Web servers typically log every request, including:
- **Client IP**: The source of the request.
- **Request Method**: GET, POST, etc.
- **Request URI**: The path and parameters.
- **Status Code**: 200 (OK), 404 (Not Found), 500 (Internal Server Error).
- **User Agent**: The client software making the request.

## Detecting SQL Injection
SQLi attempts often involve injecting SQL commands into parameters:
- **Look for**: Keywords like `UNION`, `SELECT`, `INSERT`, `DROP`, or characters like `'`, `--`, `#`.
- **Example**: `/product?id=1' UNION SELECT username, password FROM users--`

## Detecting Remote Code Execution
RCE attempts aim to execute system commands:
- **Look for**: Shell commands like `id`, `whoami`, `cat /etc/passwd`, or directory traversal patterns like `../../`.
- **Example**: `/cgi-bin/test.cgi?cmd=;cat%20/etc/passwd`

## Automated Detection with Wazuh
Wazuh's web server decoders automatically parse these logs and apply rules to identify common attack patterns. Alerts are generated for high-risk requests, allowing for rapid response.
