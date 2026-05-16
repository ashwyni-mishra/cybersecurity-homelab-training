# 04-06: Intercepting Traffic with Burp Suite

## What is it used for?
Burp Suite is used as an intercepting proxy to sit between a web browser and a target web application. This allows a security researcher to see, intercept, and modify the raw HTTP/S traffic that is normally hidden by the browser's interface. It is the industry-standard tool for manual web application penetration testing, used to identify vulnerabilities that automated scanners often miss, such as complex logic flaws, authorization issues, and intricate injection vulnerabilities.

## Techniques
1.  **Traffic Interception**: Pausing a request sent by the browser so it can be inspected or modified before it reaches the server.
2.  **Request Manipulation**: Manually changing parameters, headers, or the body of an HTTP request to test how the server handles unexpected input.
3.  **Request Replaying (Repeater)**: Sending the same request multiple times with slight variations to observe differences in the server's response.
4.  **Automated Fuzzing (Intruder)**: Sending a large number of requests with different payloads from a wordlist to identify vulnerabilities like weak passwords or vulnerable parameters.
5.  **Data Decoding/Encoding**: Using the built-in Decoder to transform data between formats like Base64, URL encoding, and Hex.

## How those techniques are used
-   **Bypassing Client-Side Validations**: If a website uses JavaScript to prevent you from entering a negative number in a "quantity" field, you can intercept the request in Burp and change the value after the browser has already validated it.
-   **Testing for IDOR (Insecure Direct Object Reference)**: By intercepting a request to `GET /api/user/123`, you can use the Repeater to change the ID to `124` and see if you can access another user's private data.
-   **Brute-Forcing Login Forms**: Using the Intruder tool, you can automatically test thousands of password combinations against a login page to identify valid credentials.
-   **Analyzing Session Tokens**: You can intercept the `Set-Cookie` header in a response to analyze the structure and entropy of session tokens, looking for patterns that might make them predictable.

## Commands used
While Burp Suite is primarily a GUI-based tool, it requires specific configuration steps:
-   **Proxy Configuration**:
    -   Configure your browser (or use Burp's built-in browser) to use `127.0.0.1:8080` as its HTTP proxy.
    -   Install the Burp CA Certificate (`http://burp`) in your browser to intercept HTTPS traffic.
-   **Using the Tools**:
    -   **Proxy Tab**: Ensure "Intercept is on" to pause requests.
    -   **Repeater**: Right-click any request in the "HTTP history" and select "Send to Repeater" (or `Ctrl+R`).
    -   **Intruder**: Right-click a request and select "Send to Intruder" (or `Ctrl+I`), then define the payload positions.
-   **CLI (Starting Burp)**:
    ```bash
    # Launch Burp Suite from the Kali terminal
    burpsuite &
    ```

## Summary
Burp Suite is the most critical tool in a web penetration tester's toolkit. By acting as a proxy, it provides total control over the communication between the client and the server. Whether you are manually tweaking a request in the Repeater or launching a large-scale fuzzing attack with the Intruder, Burp Suite enables deep, manual inspection of web application security that automated tools simply cannot replicate.

## Reference links
- [Burp Suite Official Documentation](https://portswigger.net/burp/documentation/desktop)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) - Free labs for learning Burp Suite.
- [Burp Suite Cheat Sheet](https://portswigger.net/burp/documentation/desktop/penetration-testing)
- [OWASP: Testing with Burp Suite](https://owasp.org/www-project-web-security-testing-guide/latest/3-The_Testing_Paradigm/3.1-Testing_Tools/3.1.1-Burp_Suite)
