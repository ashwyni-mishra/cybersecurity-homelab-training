# 05-04: Analyzing pcaps with Wireshark

## What is it used for?
Wireshark is the industry-standard graphical network protocol analyzer. While tools like `tcpdump` are often used to *capture* packets on headless servers, Wireshark is the tool security analysts use to *inspect* those captured `.pcap` files in deep detail. It is used for:
*   **Malware Analysis**: Understanding how malware communicates with Command and Control (C2) servers.
*   **Forensic Investigation**: Reconstructing the exact steps an attacker took during a breach by examining the payload.
*   **Network Troubleshooting**: Visually identifying latency, dropped packets, or misconfigurations.
*   **Education**: Learning how network protocols (TCP, IP, HTTP, DNS) function at a microscopic, packet-by-packet level.

## Techniques
### Display Filters
Unlike BPF capture filters (which discard packets before saving), Wireshark's display filters only hide packets from the current view without altering the underlying capture file. They use a powerful, highly specific syntax capable of filtering on almost any field in any protocol header.

### Follow Stream (TCP/UDP/HTTP)
This technique reassembles the individual, fragmented packets of a conversation into a coherent, readable format. It shows the exact back-and-forth between a client and server as if you were reading a chat transcript.

### Protocol Hierarchy & Statistics
Wireshark can instantly generate statistical overviews of the capture file. The `Endpoints` and `Conversations` tabs are crucial for identifying which IPs are generating the most traffic.

## How those techniques are used
*   **Validating Nmap Scans**: An analyst might open the `Statistics -> Endpoints` menu. If one IP shows connections to thousands of different ports, it is a clear indicator of a port scan.
*   **Extracting Exfiltrated Data**: By using the "Follow Stream" feature on unencrypted HTTP or FTP traffic, an analyst can literally read the data an attacker stole, or even export reconstructed files directly from the capture.
*   **Locating Malware Beacons**: Filtering for DNS requests to unusual, randomly generated domains (`dns.qry.name`) is a standard technique to identify infected hosts attempting to "phone home."

## Commands used
While primarily a GUI tool, interacting with Wireshark relies heavily on its filter syntax and UI workflows.

**Common Display Filters:**
```text
# Show only traffic to or from a specific IP address
ip.addr == 192.168.1.50

# Show only HTTP GET requests
http.request.method == "GET"

# Show all DNS queries (requests, not responses)
dns.flags.response == 0

# Show TCP traffic indicating a connection setup (SYN flag set, ACK not set)
tcp.flags.syn == 1 and tcp.flags.ack == 0

# Search the entire packet frame for specific plaintext
frame contains "password"
```

**UI Steps (Following a Stream):**
1.  Locate and right-click a packet of interest (e.g., an HTTP GET request).
2.  Select **Follow** -> **TCP Stream** (or **HTTP Stream**).
3.  A new window opens showing the client request in red and the server response in blue. You can save this output for your report.

**TShark (Command Line Wireshark):**
If you need Wireshark's deep analysis capabilities from the CLI (e.g., for scripting), you use `tshark`:
```bash
# Read a pcap and apply a Wireshark display filter, printing the results
tshark -r capture.pcap -Y "http.request.method == GET"
```

## Summary
Wireshark translates the invisible zeroes and ones of network traffic into a human-readable format. By mastering display filters, stream reassembly, and statistical analysis, a security professional can dissect complex attacks, extract definitive forensic evidence, and gain a profound understanding of network behavior.

## Reference links
- [Wireshark Official User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/)
- [Wireshark Display Filter Reference](https://www.wireshark.org/docs/dfref/)
- [Malware Traffic Analysis (Practice PCAPs)](https://www.malware-traffic-analysis.net/)
- [SANS: Intro to Wireshark Filtering](https://www.sans.org/blog/wireshark-display-filters/)
