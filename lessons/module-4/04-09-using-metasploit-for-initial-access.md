# 04-09: Using Metasploit for Initial Access

## Overview
The Metasploit Framework (MSF) is a powerful tool for developing and executing exploit code against a remote target machine.

## Basic Workflow
1. `msfconsole`: Launch the framework.
2. `search <vulnerability>`: Find a relevant module.
3. `use <path/to/module>`: Select the module.
4. `show options`: View required parameters (RHOSTS, LHOST, etc.).
5. `set <option> <value>`: Configure the module.
6. `exploit` or `run`: Execute the attack.
