# 05-09: Detecting Web Attacks in Logs

## What is it used for?
Detecting web attacks in logs is the process of analyzing web server access and error logs to identify malicious intent. Since web applications (like DVWA or Juice Shop in our lab) are exposed to the network, they are primary targets for exploitation.

This technique is used to:
- **Identify Exploitation Attempts**: Recognize patterns associated with SQL Injection (SQLi), Cross-Site Scripting (XSS), and Command Injection.
- **Understand Attacker Methodology**: See which pages are being targeted and what payloads are being tested.
- **Audit Application Health**: Identify broken links (404s) or server-side errors (5xx) that might indicate a successful exploit or a DoS attack.
- **Compliance and Forensics**: Maintain a record of all interactions with the application for post-incident analysis.

## Techniques
- **Keyword Matching**: Searching for common attack strings like `UNION SELECT`, `<script>`, or `../../etc/passwd`.
- **Status Code Analysis**: Monitoring for unusual spikes in 404 (Not Found) or 403 (Forbidden) errors, which can indicate automated fuzzing.
- **Payload Decoding**: Converting URL-encoded characters (like `%20` or `%27`) back into plain text to reveal the true nature of a request.
- **User-Agent Inspection**: Identifying automated scanners (like Nikto or SQLmap) based on their self-identified User-Agent strings.
- **Cross-Log Correlation**: Matching web server logs with system logs to see if a web request resulted in a new process or a shell being opened.

## How those techniques are used
- **Wazuh Web Decoders**: Wazuh automatically parses Nginx or Apache logs to extract parameters and check them against thousands of CVE-based rules.
- **Fuzzing Detection**: Setting a rule that triggers an alert if a single IP generates more than 50 "404 Not Found" errors in 1 minute.
- **SQLmap Identification**: Recognizing the specific headers and timing patterns used by automated SQL injection tools.
- **Real-time Tailing**: Using `tail -f` on the server while performing an attack from Kali to see exactly how each request is recorded.

## Commands used

### Tailing Web Logs (on Target Server)
```bash
tail -f /var/log/nginx/access.log
```

### Searching for SQLi Patterns (using Grep)
```bash
grep -Ei "select|union|from|where" /var/log/nginx/access.log
```

### Searching for Command Injection Patterns
```bash
grep -Ei "id|whoami|cat|etc/passwd" /var/log/nginx/access.log
```

### Searching for Fuzzing Activity
```bash
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr
```
*(This shows a count of status codes; look for high numbers of 404s)*

## Summary
Web server logs are a goldmine for security analysts. By understanding the structure of a HTTP request and the patterns of common exploits, you can identify and mitigate attacks before they lead to a data breach. In our lab, combining target application logs with Wazuh's centralized alerting provides a professional-grade monitoring solution.

## Reference links
- [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
- [Wazuh Documentation: Monitoring Web Server Logs](https://documentation.wazuh.com/current/user-manual/capabilities/log-data-collection/index.html)
- [Nginx: Logging Documentation](https://nginx.org/en/docs/http/ngx_http_log_module.html)
- [SANS Institute: Web Server Log Analysis for Security Professionals](https://www.sans.org/white-papers/117/)
