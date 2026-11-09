"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/lib/use-local-storage";

type Lesson = {
  module: string;
  title: string;
  explain: string;
  example: string;
  lab: string;
  question: string;
  correct: string;
  wrong: string;
};

const lessons: Lesson[] = [
  {
    module: "Start Here",
    title: "What is ICT?",
    explain:
      "ICT means information and communication technology. A computer takes input, processes instructions with a CPU, holds active data in RAM and saves files on persistent storage.",
    example:
      "Real-world example: ICT means information and communication technology. A computer takes input, processes instructions with a CPU, holds active data in RAM and saves files on persistent storage.",
    lab: "Open Task Manager and observe CPU, memory, disk and network while opening a browser.",
    question: "Which component holds working program data?",
    correct: "RAM",
    wrong: "SSD",
  },
  {
    module: "Start Here",
    title: "Bits, bytes and binary",
    explain:
      "A bit is 0 or 1; eight bits make a byte. Binary uses powers of two. For example 1010₂ = 8 + 2 = 10₁₀.",
    example:
      "Real-world example: A bit is 0 or 1; eight bits make a byte. Binary uses powers of two. For example 1010₂ = 8 + 2 = 10₁₀.",
    lab: "Convert 1101₂ to decimal, then check your answer: 13.",
    question: "How many bits are in one byte?",
    correct: "8",
    wrong: "16",
  },
  {
    module: "Start Here",
    title: "Hardware and boot",
    explain:
      "UEFI firmware initializes hardware and loads the operating-system bootloader. RAM is volatile; SSD storage retains files after shutdown.",
    example:
      "Real-world example: UEFI firmware initializes hardware and loads the operating-system bootloader. RAM is volatile; SSD storage retains files after shutdown.",
    lab: "Open System Information and record CPU, RAM, firmware mode and disk capacity.",
    question: "What starts before the operating system?",
    correct: "UEFI firmware",
    wrong: "Web browser",
  },
  {
    module: "Start Here",
    title: "Files and command line",
    explain:
      "A file is named data; a folder organizes files. An absolute path begins at a filesystem root. PowerShell commands help inspect and manage a system.",
    example:
      "Real-world example: A file is named data; a folder organizes files. An absolute path begins at a filesystem root. PowerShell commands help inspect and manage a system.",
    lab: "Run pwd, Get-ChildItem, Get-Process and Get-Help Get-Process.",
    question: "Which command lists running processes?",
    correct: "Get-Process",
    wrong: "Get-Service",
  },
  {
    module: "Start Here",
    title: "Virtual machines and safe labs",
    explain:
      "A virtual machine is an isolated guest operating system running on a hypervisor. Snapshots aid rollback but do not replace backups.",
    example:
      "Real-world example: A virtual machine is an isolated guest operating system running on a hypervisor. Snapshots aid rollback but do not replace backups.",
    lab: "Create a disposable VM, snapshot it, install a harmless app and restore the snapshot.",
    question: "What does a snapshot help with?",
    correct: "Rollback",
    wrong: "Permanent backup replacement",
  },
  {
    module: "Start Here",
    title: "Support methodology",
    explain:
      "Define symptoms and scope, gather evidence, form a hypothesis, test one change, verify the result and document the resolution.",
    example:
      "Real-world example: Define symptoms and scope, gather evidence, form a hypothesis, test one change, verify the result and document the resolution.",
    lab: "Write a fictional ticket for a PC with no network connectivity, including symptoms and tests.",
    question: "What comes first?",
    correct: "Gather evidence",
    wrong: "Random reinstall",
  },
  {
    module: "PU11",
    title: "Install and configure Windows",
    explain:
      "Modern Windows systems typically use UEFI and GPT. Before installing, check hardware compatibility, licensing, backups and recovery options.",
    example:
      "Real-world example: Modern Windows systems typically use UEFI and GPT. Before installing, check hardware compatibility, licensing, backups and recovery options.",
    lab: "In a VM inspect partitions and practice a Windows installation with properly licensed media.",
    question: "What should precede a clean install?",
    correct: "Backup and planning",
    wrong: "Formatting immediately",
  },
  {
    module: "PU11",
    title: "Drivers and peripherals",
    explain:
      "A driver enables the OS to communicate with hardware. Diagnose printers and other devices by checking power, cabling, network, drivers and queues.",
    example:
      "Real-world example: A driver enables the OS to communicate with hardware. Diagnose printers and other devices by checking power, cabling, network, drivers and queues.",
    lab: "Inspect Device Manager and draft a printer troubleshooting flow.",
    question: "What is a device driver?",
    correct: "Hardware communication software",
    wrong: "A password",
  },
  {
    module: "PU11",
    title: "Updates and patch management",
    explain:
      "Updates fix bugs and vulnerabilities. Plan testing, maintenance windows, restarts and rollback so that patching does not unnecessarily disrupt users.",
    example:
      "Real-world example: Updates fix bugs and vulnerabilities. Plan testing, maintenance windows, restarts and rollback so that patching does not unnecessarily disrupt users.",
    lab: "Inspect update history and write a patching checklist for ten workstations.",
    question: "Why plan a rollback?",
    correct: "Recover from a bad update",
    wrong: "Avoid all updates",
  },
  {
    module: "PU11",
    title: "Windows services and logs",
    explain:
      "Processes are running programs; services provide background functionality. Event Viewer helps correlate errors with timestamps and affected components.",
    example:
      "Real-world example: Processes are running programs; services provide background functionality. Event Viewer helps correlate errors with timestamps and affected components.",
    lab: "Inspect Get-Service and Event Viewer; record an event ID and explain its context.",
    question: "Where are Windows system events inspected?",
    correct: "Event Viewer",
    wrong: "Recycle Bin",
  },
  {
    module: "PU11",
    title: "Linux basics",
    explain:
      "Linux uses a root filesystem /, shell commands and package managers. On many distributions systemd manages services.",
    example:
      "Real-world example: Linux uses a root filesystem /, shell commands and package managers. On many distributions systemd manages services.",
    lab: "In a Linux VM run pwd, ls -la, cat /etc/os-release and systemctl --help.",
    question: "What is the Linux root directory?",
    correct: "/",
    wrong: "C:\\",
  },
  {
    module: "PU11",
    title: "Storage and filesystems",
    explain:
      "A partition divides disk space; a filesystem organizes data. NTFS, exFAT and ext4 differ in permissions, journaling and compatibility.",
    example:
      "Real-world example: A partition divides disk space; a filesystem organizes data. NTFS, exFAT and ext4 differ in permissions, journaling and compatibility.",
    lab: "Compare NTFS and exFAT; inspect a disposable virtual disk without formatting real drives.",
    question: "What organizes files on a volume?",
    correct: "Filesystem",
    wrong: "GPU",
  },
  {
    module: "PU11",
    title: "Software installation and licensing",
    explain:
      "Software deployment requires approved sources, version control, dependencies, compatibility, licenses and rollback.",
    example:
      "Real-world example: Software deployment requires approved sources, version control, dependencies, compatibility, licenses and rollback.",
    lab: "Inventory three apps and prepare an upgrade plan with tests.",
    question: "What must be checked before deployment?",
    correct: "Licensing and compatibility",
    wrong: "Icon design",
  },
  {
    module: "PU11",
    title: "Performance monitoring",
    explain:
      "Measure CPU, memory, disk and network activity under realistic workload. Look for trends rather than relying on a single reading.",
    example:
      "Real-world example: Measure CPU, memory, disk and network activity under realistic workload. Look for trends rather than relying on a single reading.",
    lab: "Observe Resource Monitor during a file copy and note which resource saturates.",
    question: "What indicates memory pressure?",
    correct: "Low available RAM and paging",
    wrong: "Screen resolution alone",
  },
  {
    module: "PU11",
    title: "Virtualization and containers",
    explain:
      "VMs run guest operating systems; containers share a host kernel while isolating applications. Each has different resource and security properties.",
    example:
      "Real-world example: VMs run guest operating systems; containers share a host kernel while isolating applications. Each has different resource and security properties.",
    lab: "Compare a Linux VM and container by boot time, isolation and storage.",
    question: "Which usually has its own guest kernel?",
    correct: "VM",
    wrong: "Ordinary container",
  },
  {
    module: "PU11",
    title: "Remote support and communication",
    explain:
      "Get authorization before remote control. Protect privacy, confirm identity, communicate simply and document actions.",
    example:
      "Real-world example: Get authorization before remote control. Protect privacy, confirm identity, communicate simply and document actions.",
    lab: "Role-play a remote support call and write a concise handover note.",
    question: "What comes before remote control?",
    correct: "User authorization",
    wrong: "Disable audit logs",
  },
  {
    module: "PU12",
    title: "Users, groups and least privilege",
    explain:
      "Authentication checks identity; authorization determines access. Groups simplify rights assignment. Least privilege limits accounts to needed permissions.",
    example:
      "Real-world example: Authentication checks identity; authorization determines access. Groups simplify rights assignment. Least privilege limits accounts to needed permissions.",
    lab: "Create two test users in a VM and compare standard versus administrator rights.",
    question: "What does least privilege mean?",
    correct: "Minimum required access",
    wrong: "Administrator for everyone",
  },
  {
    module: "PU12",
    title: "Passwords and MFA",
    explain:
      "Use unique passwords, secure password managers and independent MFA factors. Two passwords are not two independent factor types.",
    example:
      "Real-world example: Use unique passwords, secure password managers and independent MFA factors. Two passwords are not two independent factor types.",
    lab: "Design a secure sign-in policy for a fictional office.",
    question: "What does MFA add?",
    correct: "Independent authentication factor",
    wrong: "A second username",
  },
  {
    module: "PU12",
    title: "NTFS and share permissions",
    explain:
      "A network file share can have both share permissions and filesystem permissions. Effective access must satisfy applicable restrictions.",
    example:
      "Real-world example: A network file share can have both share permissions and filesystem permissions. Effective access must satisfy applicable restrictions.",
    lab: "Create a test shared folder with Read and Modify groups and test access.",
    question: "Which permissions apply locally on NTFS?",
    correct: "NTFS permissions",
    wrong: "DNS records",
  },
  {
    module: "PU12",
    title: "Active Directory basics",
    explain:
      "AD DS centrally manages domain identities and computer objects. OUs organize administration; groups control access.",
    example:
      "Real-world example: AD DS centrally manages domain identities and computer objects. OUs organize administration; groups control access.",
    lab: "Sketch a small domain with users, computers, OUs and security groups.",
    question: "What does AD DS manage?",
    correct: "Directory objects",
    wrong: "Wi-Fi signal",
  },
  {
    module: "PU12",
    title: "Group Policy",
    explain:
      "GPOs apply centralized configuration to users and computers. Scope, inheritance, security filtering and precedence affect results.",
    example:
      "Real-world example: GPOs apply centralized configuration to users and computers. Scope, inheritance, security filtering and precedence affect results.",
    lab: "Design a harmless screen-lock policy for lab computers, including rollback.",
    question: "What does a GPO do?",
    correct: "Apply configuration centrally",
    wrong: "Replace backups",
  },
  {
    module: "PU12",
    title: "Confidentiality, integrity, availability",
    explain:
      "Confidentiality limits disclosure, integrity protects correctness and availability keeps services accessible. Different controls address different risks.",
    example:
      "Real-world example: Confidentiality limits disclosure, integrity protects correctness and availability keeps services accessible. Different controls address different risks.",
    lab: "Map encryption, checksums and redundancy to the CIA triad.",
    question: "What does integrity protect?",
    correct: "Correctness of data",
    wrong: "Only uptime",
  },
  {
    module: "PU12",
    title: "Encryption and recovery",
    explain:
      "Encryption protects data when keys are managed properly. Losing a BitLocker recovery key may make a volume inaccessible.",
    example:
      "Real-world example: Encryption protects data when keys are managed properly. Losing a BitLocker recovery key may make a volume inaccessible.",
    lab: "Write a recovery-key storage and access procedure for test devices.",
    question: "What is needed for encrypted recovery?",
    correct: "Recovery key",
    wrong: "Printer driver",
  },
  {
    module: "PU12",
    title: "Account lifecycle",
    explain:
      "Joiner, mover and leaver processes ensure accounts and access change with employment roles. Promptly revoke unnecessary access and sessions.",
    example:
      "Real-world example: Joiner, mover and leaver processes ensure accounts and access change with employment roles. Promptly revoke unnecessary access and sessions.",
    lab: "Create onboarding and offboarding checklists.",
    question: "What follows departure?",
    correct: "Revoke access",
    wrong: "Keep all access",
  },
  {
    module: "PU12",
    title: "NAS, RAID and backups",
    explain:
      "NAS provides shared storage using protocols such as SMB. RAID improves some failure tolerance but cannot replace independent backups.",
    example:
      "Real-world example: NAS provides shared storage using protocols such as SMB. RAID improves some failure tolerance but cannot replace independent backups.",
    lab: "Diagram a NAS with user groups, snapshots and offline backup.",
    question: "Is RAID a backup?",
    correct: "No",
    wrong: "Yes",
  },
  {
    module: "PU12",
    title: "Email and DNS",
    explain:
      "Mailboxes, aliases and shared mailboxes require lifecycle management. MX records indicate mail routing destinations.",
    example:
      "Real-world example: Mailboxes, aliases and shared mailboxes require lifecycle management. MX records indicate mail routing destinations.",
    lab: "Design a mailbox setup checklist with MFA and an MX record explanation.",
    question: "Which DNS record routes mail?",
    correct: "MX",
    wrong: "A only",
  },
  {
    module: "PU12",
    title: "BYOD and endpoint policies",
    explain:
      "Personal devices accessing business resources need device requirements, encryption, updates, separation of data and transparent privacy policies.",
    example:
      "Real-world example: Personal devices accessing business resources need device requirements, encryption, updates, separation of data and transparent privacy policies.",
    lab: "Write a one-page BYOD policy for a fictional company.",
    question: "What is BYOD?",
    correct: "Bring your own device",
    wrong: "Backup your old disk",
  },
  {
    module: "PU12",
    title: "VoIP and web security",
    explain:
      "VoIP quality depends on latency, jitter and packet loss. HTTPS uses TLS for encrypted transport but does not guarantee a trustworthy website.",
    example:
      "Real-world example: VoIP quality depends on latency, jitter and packet loss. HTTPS uses TLS for encrypted transport but does not guarantee a trustworthy website.",
    lab: "Measure latency in your own network and explain a choppy call.",
    question: "What degrades voice calls?",
    correct: "Jitter and packet loss",
    wrong: "Wallpaper",
  },
  {
    module: "PU13",
    title: "Networking models",
    explain:
      "The OSI model organizes concepts into layers; TCP/IP describes the deployed internet protocol family. Ethernet carries local frames and IP routes packets.",
    example:
      "Real-world example: The OSI model organizes concepts into layers; TCP/IP describes the deployed internet protocol family. Ethernet carries local frames and IP routes packets.",
    lab: "Trace a browser request through DNS, TCP, TLS and HTTP.",
    question: "What routes packets across networks?",
    correct: "IP",
    wrong: "HDMI",
  },
  {
    module: "PU13",
    title: "Ethernet, switches and VLANs",
    explain:
      "Switches learn MAC addresses. VLANs separate broadcast domains but still need routing and firewall rules for robust security.",
    example:
      "Real-world example: Switches learn MAC addresses. VLANs separate broadcast domains but still need routing and firewall rules for robust security.",
    lab: "Draw office and guest VLANs with a router/firewall.",
    question: "What address does a switch learn?",
    correct: "MAC",
    wrong: "Email",
  },
  {
    module: "PU13",
    title: "IPv4 and CIDR",
    explain:
      "IPv4 addresses are 32 bits. A /24 prefix has 24 network bits. For 192.168.1.25/24, the network is 192.168.1.0.",
    example:
      "Real-world example: IPv4 addresses are 32 bits. A /24 prefix has 24 network bits. For 192.168.1.25/24, the network is 192.168.1.0.",
    lab: "Calculate the network and broadcast addresses for 192.168.10.0/26.",
    question: "How many total addresses in a /26?",
    correct: "64",
    wrong: "26",
  },
  {
    module: "PU13",
    title: "Subnetting practice",
    explain:
      "A /26 has 6 host bits, so 2⁶ = 64 total addresses. A typical subnet reserves network and broadcast addresses, leaving 62 usable.",
    example:
      "Real-world example: A /26 has 6 host bits, so 2⁶ = 64 total addresses. A typical subnet reserves network and broadcast addresses, leaving 62 usable.",
    lab: "Solve /25, /26, /27 and /28 address-range exercises.",
    question: "Typical usable hosts in /26?",
    correct: "62",
    wrong: "64",
  },
  {
    module: "PU13",
    title: "IPv6",
    explain:
      "IPv6 uses 128-bit addresses. ::1 is loopback; fe80::/10 is link-local. SLAAC and DHCPv6 can provide addressing information.",
    example:
      "Real-world example: IPv6 uses 128-bit addresses. ::1 is loopback; fe80::/10 is link-local. SLAAC and DHCPv6 can provide addressing information.",
    lab: "Inspect ipconfig or ip -6 addr and identify address scopes.",
    question: "IPv6 loopback?",
    correct: "::1",
    wrong: "127.0.0.1",
  },
  {
    module: "PU13",
    title: "DHCP",
    explain:
      "DHCP assigns network configuration using a lease. The classic IPv4 exchange is Discover, Offer, Request, Acknowledge.",
    example:
      "Real-world example: DHCP assigns network configuration using a lease. The classic IPv4 exchange is Discover, Offer, Request, Acknowledge.",
    lab: "Inspect DHCP lease, gateway and DNS values using ipconfig /all.",
    question: "What does DHCP supply?",
    correct: "IP configuration",
    wrong: "Disk encryption",
  },
  {
    module: "PU13",
    title: "DNS",
    explain:
      "DNS resolves names using A, AAAA, CNAME, MX and other records. TTL affects caching and propagation of changes.",
    example:
      "Real-world example: DNS resolves names using A, AAAA, CNAME, MX and other records. TTL affects caching and propagation of changes.",
    lab: "Use nslookup or Resolve-DnsName to inspect public records.",
    question: "Which record maps a name to IPv4?",
    correct: "A",
    wrong: "MX",
  },
  {
    module: "PU13",
    title: "Routing and NAT",
    explain:
      "Routers forward traffic between IP networks. NAT translates addresses, often allowing multiple private IPv4 clients to share a public address.",
    example:
      "Real-world example: Routers forward traffic between IP networks. NAT translates addresses, often allowing multiple private IPv4 clients to share a public address.",
    lab: "Draw a packet path from a laptop to a public website.",
    question: "What forwards between IP networks?",
    correct: "Router",
    wrong: "Keyboard",
  },
  {
    module: "PU13",
    title: "TCP, UDP and ports",
    explain:
      "TCP offers reliable ordered byte streams; UDP sends datagrams without built-in delivery guarantees. Ports identify endpoints.",
    example:
      "Real-world example: TCP offers reliable ordered byte streams; UDP sends datagrams without built-in delivery guarantees. Ports identify endpoints.",
    lab: "Inspect local connections with Get-NetTCPConnection.",
    question: "Which transport provides ordered reliable delivery?",
    correct: "TCP",
    wrong: "UDP",
  },
  {
    module: "PU13",
    title: "Wi-Fi planning and security",
    explain:
      "Wireless networks require channel planning, coverage, capacity and WPA2/WPA3 security. A hidden SSID is not meaningful encryption.",
    example:
      "Real-world example: Wireless networks require channel planning, coverage, capacity and WPA2/WPA3 security. A hidden SSID is not meaningful encryption.",
    lab: "Measure signal and latency in your own home network.",
    question: "What protects modern Wi-Fi traffic?",
    correct: "WPA2/WPA3",
    wrong: "Hidden SSID alone",
  },
  {
    module: "PU13",
    title: "Firewalls and port forwarding",
    explain:
      "A firewall filters traffic according to rules. Port forwarding exposes services through a gateway and should be minimized.",
    example:
      "Real-world example: A firewall filters traffic according to rules. Port forwarding exposes services through a gateway and should be minimized.",
    lab: "Design a default-deny inbound firewall policy for a small office.",
    question: "Safer inbound default?",
    correct: "Deny unless needed",
    wrong: "Allow all",
  },
  {
    module: "PU13",
    title: "VPN and remote access",
    explain:
      "VPNs encrypt tunnels but do not replace identity verification, MFA, endpoint health checks and authorization.",
    example:
      "Real-world example: VPNs encrypt tunnels but do not replace identity verification, MFA, endpoint health checks and authorization.",
    lab: "Diagram a remote worker accessing internal services through approved VPN.",
    question: "Does VPN make a compromised laptop safe?",
    correct: "No",
    wrong: "Yes",
  },
  {
    module: "PU13",
    title: "Network diagnostics",
    explain:
      "Diagnose layer by layer: link, IP address, gateway, DNS, then application. Use ping, traceroute and nslookup on authorized systems.",
    example:
      "Real-world example: Diagnose layer by layer: link, IP address, gateway, DNS, then application. Use ping, traceroute and nslookup on authorized systems.",
    lab: "Record ipconfig, ping gateway, DNS lookup and traceroute results.",
    question: "IP works but hostnames fail: check?",
    correct: "DNS",
    wrong: "Wallpaper",
  },
  {
    module: "PU13",
    title: "Network security and documentation",
    explain:
      "Keep an inventory, addressing plan, topology, change log and backup of configurations. Segment sensitive systems and patch network devices.",
    example:
      "Real-world example: Keep an inventory, addressing plan, topology, change log and backup of configurations. Segment sensitive systems and patch network devices.",
    lab: "Create a topology and address plan for a fictional office.",
    question: "Why document a network?",
    correct: "Safe maintenance and troubleshooting",
    wrong: "Avoid monitoring",
  },
  {
    module: "SP1",
    title: "Windows Server roles",
    explain:
      "Servers deliver centralized services such as identity, DNS, DHCP, file shares and applications. Plan dependencies and maintenance.",
    example:
      "Real-world example: Servers deliver centralized services such as identity, DNS, DHCP, file shares and applications. Plan dependencies and maintenance.",
    lab: "Design a server VM with hostname, static IP and documented roles.",
    question: "What is a server role?",
    correct: "A service provided to clients",
    wrong: "A cable",
  },
  {
    module: "SP1",
    title: "Advanced AD administration",
    explain:
      "Delegation grants limited administrative rights. Plan OU structure, groups, service accounts and privileged access carefully.",
    example:
      "Real-world example: Delegation grants limited administrative rights. Plan OU structure, groups, service accounts and privileged access carefully.",
    lab: "Design delegated password reset rights for a help desk group.",
    question: "What is delegation?",
    correct: "Limited administrative rights",
    wrong: "Shared admin password",
  },
  {
    module: "SP1",
    title: "Server DNS and DHCP",
    explain:
      "Server-side DNS and DHCP underpin domain networks. Domain clients must resolve required service records and obtain correct addressing.",
    example:
      "Real-world example: Server-side DNS and DHCP underpin domain networks. Domain clients must resolve required service records and obtain correct addressing.",
    lab: "Build a test DNS zone and DHCP scope in an isolated lab.",
    question: "What helps clients find domain services by name?",
    correct: "DNS",
    wrong: "HDMI",
  },
  {
    module: "SP1",
    title: "Storage pools, quotas and DFS",
    explain:
      "Storage pools aggregate capacity, quotas limit use, and DFS can provide a unified namespace. Plan availability and recovery separately.",
    example:
      "Real-world example: Storage pools aggregate capacity, quotas limit use, and DFS can provide a unified namespace. Plan availability and recovery separately.",
    lab: "Design a shared storage structure with quotas and recovery plan.",
    question: "What does a quota limit?",
    correct: "Storage usage",
    wrong: "CPU frequency",
  },
  {
    module: "SP1",
    title: "Server virtualization",
    explain:
      "Server VMs require CPU, memory, storage, networking and growth capacity. Oversubscription can hurt performance.",
    example:
      "Real-world example: Server VMs require CPU, memory, storage, networking and growth capacity. Oversubscription can hurt performance.",
    lab: "Size a host for three small server VMs with spare capacity.",
    question: "What matters in capacity planning?",
    correct: "Memory CPU storage growth",
    wrong: "VM names only",
  },
  {
    module: "SP1",
    title: "Server hardening",
    explain:
      "Reduce attack surface through patches, limited privileges, secure remote administration, logging and removal of unnecessary services.",
    example:
      "Real-world example: Reduce attack surface through patches, limited privileges, secure remote administration, logging and removal of unnecessary services.",
    lab: "Create a hardening checklist for a disposable server VM.",
    question: "What is hardening?",
    correct: "Reducing attack surface",
    wrong: "Disabling logs",
  },
  {
    module: "SP1",
    title: "Monitoring and incident response",
    explain:
      "Monitor availability, capacity and logs. Alerts need thresholds, ownership and documented response. Preserve evidence during incidents.",
    example:
      "Real-world example: Monitor availability, capacity and logs. Alerts need thresholds, ownership and documented response. Preserve evidence during incidents.",
    lab: "Define five metrics, thresholds and escalation steps.",
    question: "What makes an alert useful?",
    correct: "Clear action and owner",
    wrong: "Many notifications",
  },
  {
    module: "SP1",
    title: "Backup, restore, RPO and RTO",
    explain:
      "RPO is acceptable data loss; RTO is target restoration time. Protect backup copies and regularly test actual restoration.",
    example:
      "Real-world example: RPO is acceptable data loss; RTO is target restoration time. Protect backup copies and regularly test actual restoration.",
    lab: "Write a backup plan and restore sample files in a lab.",
    question: "What does RTO measure?",
    correct: "Time to restore",
    wrong: "Data loss tolerance",
  },
  {
    module: "SP1",
    title: "Imaging and software deployment",
    explain:
      "Standardized deployment improves consistency. Test OS images, drivers, licenses, applications and rollback before rollout.",
    example:
      "Real-world example: Standardized deployment improves consistency. Test OS images, drivers, licenses, applications and rollback before rollout.",
    lab: "Create a deployment task checklist for 20 fictional PCs.",
    question: "Why standardize deployment?",
    correct: "Repeatability",
    wrong: "Avoid testing",
  },
  {
    module: "SP1",
    title: "Firewalls and server security",
    explain:
      "Server firewalls should permit only necessary traffic. Investigate anomalies using logs and established defensive procedures.",
    example:
      "Real-world example: Server firewalls should permit only necessary traffic. Investigate anomalies using logs and established defensive procedures.",
    lab: "Write a firewall rule matrix and a fictional incident triage playbook.",
    question: "What should happen to incident logs?",
    correct: "Preserve and document",
    wrong: "Delete immediately",
  },
  {
    module: "SP1",
    title: "Migration and project planning",
    explain:
      "Infrastructure migration requires discovery, dependencies, backups, stakeholder communication, validation and rollback.",
    example:
      "Real-world example: Infrastructure migration requires discovery, dependencies, backups, stakeholder communication, validation and rollback.",
    lab: "Plan a fictional file server migration with a maintenance window.",
    question: "What must a migration plan include?",
    correct: "Validation and rollback",
    wrong: "Only a date",
  },
  {
    module: "SP1",
    title: "Final infrastructure capstone",
    explain:
      "Combine server roles, identities, file shares, VLANs, secure remote access, monitoring, backup tests and documentation into one design.",
    example:
      "Real-world example: Combine server roles, identities, file shares, VLANs, secure remote access, monitoring, backup tests and documentation into one design.",
    lab: "Design a fictional 20-user office with network diagram, addressing, permissions, RPO/RTO and acceptance tests.",
    question: "What demonstrates a maintainable system?",
    correct: "Tested services and documentation",
    wrong: "Undocumented changes",
  },
];

const groups = [
  {
    id: "Start Here",
    name: "Start Here · ICT Foundations",
    description:
      "Start at zero: computers, binary, hardware, command line, labs and support methodology.",
  },
  {
    id: "PU11",
    name: "PU11 · Operating Systems & System Technology",
    description:
      "Install, configure, maintain and troubleshoot operating systems and devices.",
  },
  {
    id: "PU12",
    name: "PU12 · Users & Resources",
    description:
      "Accounts, permissions, directory services, data protection and collaboration.",
  },
  {
    id: "PU13",
    name: "PU13 · Business & SoHo Network",
    description:
      "Networking fundamentals, addressing, switching, routing and security.",
  },
  {
    id: "SP1",
    name: "SP1 · ICT Professional · Systems & Network",
    description:
      "Server administration, monitoring, backup, migration and operations.",
  },
];

const studyPlan = [
  [
    "Read and understand",
    "25 min",
    "Read the explanation twice, rewrite it in your own words, and define unfamiliar terms.",
  ],
  [
    "Work the example",
    "20 min",
    "Explain each step aloud. Change one condition and predict the result.",
  ],
  [
    "Hands-on lab",
    "45 min",
    "Perform the task in your own or isolated lab. Capture evidence and write down observations.",
  ],
  [
    "Self-test",
    "15 min",
    "Answer the question, then explain why the other choice is incorrect.",
  ],
  [
    "Review and notes",
    "15 min",
    "Write three takeaways, one unresolved question and a troubleshooting checklist.",
  ],
];

export default function IctSizCourse() {
  const [saved, save] = useLocalStorage("academy-ict-siz-v1");
  const [sessionProgress, setSessionProgress] = useState<{
    active: number;
    done: number[];
  } | null>(null);
  let progress: { active: number; done: number[] } = { active: 0, done: [] };
  try {
    const parsed = JSON.parse(saved ?? "{}");
    const validIndex = (value: unknown): value is number =>
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value < lessons.length;
    progress = {
      active: validIndex(parsed?.active) ? parsed.active : 0,
      done: Array.isArray(parsed?.done) ? parsed.done.filter(validIndex) : [],
    };
  } catch {
    // Ignore invalid progress saved by an older session.
  }
  const { active, done } = sessionProgress ?? progress;
  function updateProgress(next: typeof progress) {
    setSessionProgress(next);
    save(JSON.stringify(next));
  }
  function setActive(active: number) {
    updateProgress({ active, done });
  }
  function setDone(update: (done: number[]) => number[]) {
    updateProgress({ active, done: update(done) });
  }
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [showSolution, setShowSolution] = useState(false);
  const [intro, setIntro] = useState(true);
  const lesson = lessons[active];
  const visible = useMemo(
    () =>
      lessons
        .map((lesson, index) => ({ lesson, index }))
        .filter(
          ({ lesson }) =>
            (filter === "All" || lesson.module === filter) &&
            (lesson.title + " " + lesson.explain + " " + lesson.module)
              .toLowerCase()
              .includes(query.toLowerCase()),
        ),
    [query, filter],
  );
  const select = (i: number) => {
    setActive(i);
    setShowSolution(false);
    setIntro(false);
  };
  const options =
    active % 2 === 0
      ? [lesson.correct, lesson.wrong]
      : [lesson.wrong, lesson.correct];
  const answered = answers[active];
  const correct = answered === lesson.correct;
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 text-[var(--foreground)] sm:px-6">
      <Link
        href="/learn"
        className="text-sm text-[var(--muted)] hover:underline"
      >
        ← Back to LearnBlog Academy
      </Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-[.25em] text-[var(--accent)]">
        ICT Systems & Network · Independent study path
      </p>
      <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
        From First Computer to ICT Professional
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
        A beginner-first, structured course inspired by the published topic
        outline of Wirtschaftsschule Five&apos;s ICT Power-User SIZ and ICT
        Professional SIZ (Systems & Network) pathway. Learn the concepts, work
        examples, complete safe labs and check your understanding in order.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full border border-[var(--border)] px-4 py-2">
          {lessons.length} lessons
        </span>
        <span className="rounded-full border border-[var(--border)] px-4 py-2">
          5 stages
        </span>
        <span className="rounded-full border border-[var(--border)] px-4 py-2">
          Suggested 2 hours per lesson
        </span>
        <span className="rounded-full border border-[var(--border)] px-4 py-2">
          {done.length} completed
        </span>
      </div>
      <div
        className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--surface)]"
        aria-label="Course progress"
      >
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all"
          style={{ width: `${(done.length / lessons.length) * 100}%` }}
        />
      </div>
      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <button
          className="flex w-full items-center justify-between gap-4 text-left text-xl font-semibold"
          onClick={() => setIntro(!intro)}
          aria-expanded={intro}
        >
          Course introduction & how to study <span>{intro ? "−" : "+"}</span>
        </button>
        {intro && (
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
            <p>
              <strong className="text-[var(--foreground)]">
                Who this is for:
              </strong>{" "}
              Absolute beginners, future IT support technicians, and learners
              preparing for systems and network administration. No professional
              IT experience is assumed. Start at lesson 1 even if you already
              know some concepts, then move ahead after testing yourself.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">
                Learning order:
              </strong>{" "}
              Foundations → PU11 Operating Systems → PU12 Users & Resources →
              PU13 Networks → SP1 Professional Server Administration. This
              follows the provider&apos;s four named syllabus areas, with a
              separate introductory foundation stage added for beginners.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Your lab:</strong> A
              Windows computer with PowerShell and optionally a Linux/Windows
              virtual machine. Use only devices and networks you own or are
              authorized to administer. Snapshot VMs before experiments. Never
              format your real disk or expose lab servers to the public
              internet.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">
                Important distinction:
              </strong>{" "}
              This is original independent teaching material, not an official
              SIZ textbook, approved training platform, exam simulator, or
              guarantee of exam readiness. The school publishes the subject
              areas but not every detailed exam objective. Check official SIZ
              objectives and exam regulations before sitting exams.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">
                Time expectations:
              </strong>{" "}
              The two-hour block is a suggested study workflow, not two hours of
              written text. Each lesson is a concise first-pass explanation plus
              an applied task. For deeper mastery, repeat the lab, study vendor
              documentation and build your own troubleshooting notes.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Progress:</strong>{" "}
              Completion is stored locally in this browser. It does not sync
              across devices, and clearing browser data may remove it.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {studyPlan.map(([name, time, description]) => (
                <div
                  key={name}
                  className="rounded-xl border border-[var(--border)] p-3"
                >
                  <p className="font-semibold text-[var(--foreground)]">
                    {name}
                  </p>
                  <p className="text-xs text-[var(--accent)]">{time}</p>
                  <p className="mt-2 text-xs leading-5">{description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 grid gap-7 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="self-start rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold">Course contents</h2>
          <label
            htmlFor="ict-search"
            className="mt-4 block text-xs text-[var(--muted)]"
          >
            Search topics
          </label>
          <input
            id="ict-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="DNS, Windows, backup…"
            className="mt-2 w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          <label
            htmlFor="ict-filter"
            className="mt-3 block text-xs text-[var(--muted)]"
          >
            Stage
          </label>
          <select
            id="ict-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
          >
            <option value="All">All stages</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.id} · {g.name.split(" · ").slice(1).join(" · ")}
              </option>
            ))}
          </select>
          <p className="mt-3 text-xs text-[var(--muted)]">
            {visible.length} lessons shown
          </p>
          <nav
            aria-label="ICT lessons"
            className="mt-4 max-h-[60vh] space-y-1 overflow-y-auto pr-1"
          >
            {visible.map(({ lesson: l, index }) => (
              <button
                key={index}
                onClick={() => select(index)}
                className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${index === active ? "bg-[var(--accent-soft)] font-semibold text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--accent-soft)]"}`}
              >
                <span className="w-6 shrink-0 text-xs tabular-nums">
                  {done.includes(index)
                    ? "✓"
                    : String(index + 1).padStart(2, "0")}
                </span>
                <span>{l.title}</span>
              </button>
            ))}
          </nav>
        </aside>
        <article className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            Lesson {active + 1} of {lessons.length} · {lesson.module}
          </p>
          <h2 className="mt-3 text-3xl font-bold">{lesson.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {groups.find((g) => g.id === lesson.module)?.description}
          </p>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">1. Understand the concept</h3>
            <p className="mt-3 leading-8 text-[var(--muted)]">
              {lesson.explain}
            </p>
          </section>
          <section className="mt-8 rounded-xl border border-[var(--border)] p-5">
            <h3 className="text-xl font-semibold">
              2. Walk through an example
            </h3>
            <p className="mt-3 leading-8 text-[var(--muted)]">
              {lesson.example}
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Explain the example to an imaginary beginner. What changes if one
              assumption changes?
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">3. Hands-on practice</h3>
            <p className="mt-3 leading-8 text-[var(--muted)]">{lesson.lab}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Document the objective, your steps, observations, screenshots or
              command output, and what you would troubleshoot if it failed.
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">4. Knowledge check</h3>
            <p className="mt-3 leading-7">{lesson.question}</p>
            <div className="mt-4 grid gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setAnswers((p) => ({ ...p, [active]: option }));
                    setShowSolution(true);
                  }}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition hover:border-[var(--accent)] ${answered === option ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border)]"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {showSolution && answered && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-[var(--border)] p-4 text-sm leading-7"
              >
                <strong>{correct ? "Correct." : "Not quite."}</strong> The
                correct answer is <strong>{lesson.correct}</strong>. Revisit the
                explanation and try to justify the answer in your own words.
              </p>
            )}
          </section>
          <section className="mt-8">
            <h3 className="text-xl font-semibold">5. Teach it back</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Write down: (1) a beginner-friendly definition, (2) an example
              from everyday IT support, (3) the most common mistake, (4) how to
              verify the result, and (5) one follow-up question.
            </p>
          </section>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-6">
            <button
              onClick={() =>
                setDone((prev) =>
                  prev.includes(active)
                    ? prev.filter((x) => x !== active)
                    : [...prev, active],
                )
              }
              className="rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
            >
              {done.includes(active)
                ? "✓ Completed · Undo"
                : "Mark lesson complete"}
            </button>
            <button
              disabled={active === 0}
              onClick={() => select(active - 1)}
              className="rounded-lg border border-[var(--border)] px-4 py-3 text-sm disabled:opacity-30"
            >
              ← Previous
            </button>
            <button
              disabled={active === lessons.length - 1}
              onClick={() => select(active + 1)}
              className="rounded-lg border border-[var(--border)] px-4 py-3 text-sm disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </article>
      </div>
      <div className="mt-10 border-t border-[var(--border)] pt-6 text-sm leading-7 text-[var(--muted)]">
        Based on the publicly listed topic areas of{" "}
        <a
          className="underline"
          href="https://www.wirtschaftsschule-five.ch/weiterbildung/ict-power-user-siz-professional-siz-systems-network/"
          target="_blank"
          rel="noreferrer"
        >
          Wirtschaftsschule Five · ICT Power-User + ICT Professional SIZ
        </a>
        . Independent study content, not affiliated with or endorsed by WSF or
        SIZ.
      </div>
    </main>
  );
}
