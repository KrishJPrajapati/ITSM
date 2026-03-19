import React, { useState } from "react";

/* ─────────────────────────────────────────────
   DATA PER TIME PERIOD
───────────────────────────────────────────── */
const allServerData = {
  "Live": [
    { id: "SRV-001", name: "PROD-WEB-01",    cpu: 78, memory: 82, disk: 65, network: "Online",  uptime: "42d 6h",   temp: 71, status: "Warning",  ip: "192.168.1.101", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A1", lastReboot: "2025-02-05 03:12 AM", cpuCores: 16, totalRam: "64 GB",  totalDisk: "2 TB",  networkIn: "1.2 GB/s", networkOut: "0.8 GB/s", alerts: ["High memory usage (82%)", "CPU spike detected at 14:22"], services: [{ name: "nginx", status: "Running" }, { name: "nodejs", status: "Running" }, { name: "redis", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-002", name: "DB-PRIMARY-02",  cpu: 93, memory: 95, disk: 88, network: "Online",  uptime: "15d 3h",   temp: 88, status: "Critical", ip: "192.168.1.102", os: "CentOS 8",            location: "DC-RACK-B2", lastReboot: "2025-03-04 10:45 AM", cpuCores: 32, totalRam: "128 GB", totalDisk: "10 TB", networkIn: "3.5 GB/s", networkOut: "2.1 GB/s", alerts: ["CRITICAL: CPU at 93%", "CRITICAL: Memory at 95%", "Disk usage high (88%)", "Temperature warning: 88°C"], services: [{ name: "mysql", status: "Running" }, { name: "mysqld_safe", status: "Running" }, { name: "backup-agent", status: "Stopped" }, { name: "monitoring", status: "Running" }] },
    { id: "SRV-003", name: "FILE-SERVER-03", cpu: 34, memory: 52, disk: 91, network: "Online",  uptime: "88d 14h",  temp: 62, status: "Warning",  ip: "192.168.1.103", os: "Windows Server 2022", location: "DC-RACK-A3", lastReboot: "2024-12-20 07:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "50 TB", networkIn: "0.5 GB/s", networkOut: "0.3 GB/s", alerts: ["Disk usage critical (91%) — cleanup recommended"], services: [{ name: "smb", status: "Running" }, { name: "nfs", status: "Running" }, { name: "antivirus", status: "Running" }, { name: "disk-monitor", status: "Running" }] },
    { id: "SRV-004", name: "BACKUP-SRV-04",  cpu: 21, memory: 44, disk: 38, network: "Online",  uptime: "120d 2h",  temp: 55, status: "Healthy",  ip: "192.168.1.104", os: "Ubuntu 20.04 LTS",    location: "DC-RACK-C1", lastReboot: "2024-11-19 02:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "20 TB", networkIn: "0.2 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "rsync", status: "Running" }, { name: "bacula", status: "Running" }, { name: "ssh", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-005", name: "MAIL-SRV-05",    cpu: 18, memory: 37, disk: 29, network: "Online",  uptime: "60d 11h",  temp: 49, status: "Healthy",  ip: "192.168.1.105", os: "Debian 11",           location: "DC-RACK-B4", lastReboot: "2025-01-18 06:30 AM", cpuCores: 4,  totalRam: "16 GB",  totalDisk: "1 TB",  networkIn: "0.1 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "postfix", status: "Running" }, { name: "dovecot", status: "Running" }, { name: "spamassassin", status: "Running" }, { name: "fail2ban", status: "Running" }] },
    { id: "SRV-006", name: "APP-STAGING-06", cpu: 45, memory: 60, disk: 55, network: "Online",  uptime: "7d 5h",    temp: 64, status: "Healthy",  ip: "192.168.1.106", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A5", lastReboot: "2025-03-12 09:15 AM", cpuCores: 12, totalRam: "48 GB",  totalDisk: "4 TB",  networkIn: "0.7 GB/s", networkOut: "0.4 GB/s", alerts: [], services: [{ name: "docker", status: "Running" }, { name: "nginx", status: "Running" }, { name: "jenkins", status: "Running" }, { name: "prometheus", status: "Running" }] },
  ],
  "24 Hours": [
    { id: "SRV-001", name: "PROD-WEB-01",    cpu: 72, memory: 78, disk: 64, network: "Online",  uptime: "42d 6h",   temp: 69, status: "Warning",  ip: "192.168.1.101", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A1", lastReboot: "2025-02-05 03:12 AM", cpuCores: 16, totalRam: "64 GB",  totalDisk: "2 TB",  networkIn: "1.1 GB/s", networkOut: "0.7 GB/s", alerts: ["Avg memory elevated (78%) over 24h"], services: [{ name: "nginx", status: "Running" }, { name: "nodejs", status: "Running" }, { name: "redis", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-002", name: "DB-PRIMARY-02",  cpu: 85, memory: 88, disk: 87, network: "Online",  uptime: "15d 3h",   temp: 83, status: "Critical", ip: "192.168.1.102", os: "CentOS 8",            location: "DC-RACK-B2", lastReboot: "2025-03-04 10:45 AM", cpuCores: 32, totalRam: "128 GB", totalDisk: "10 TB", networkIn: "3.2 GB/s", networkOut: "1.9 GB/s", alerts: ["CRITICAL: Avg CPU 85% over 24h", "Memory consistently high (88%)"], services: [{ name: "mysql", status: "Running" }, { name: "mysqld_safe", status: "Running" }, { name: "backup-agent", status: "Stopped" }, { name: "monitoring", status: "Running" }] },
    { id: "SRV-003", name: "FILE-SERVER-03", cpu: 30, memory: 48, disk: 90, network: "Online",  uptime: "88d 14h",  temp: 60, status: "Warning",  ip: "192.168.1.103", os: "Windows Server 2022", location: "DC-RACK-A3", lastReboot: "2024-12-20 07:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "50 TB", networkIn: "0.4 GB/s", networkOut: "0.3 GB/s", alerts: ["Disk avg 90% over 24h — critical"], services: [{ name: "smb", status: "Running" }, { name: "nfs", status: "Running" }, { name: "antivirus", status: "Running" }, { name: "disk-monitor", status: "Running" }] },
    { id: "SRV-004", name: "BACKUP-SRV-04",  cpu: 19, memory: 40, disk: 37, network: "Online",  uptime: "120d 2h",  temp: 53, status: "Healthy",  ip: "192.168.1.104", os: "Ubuntu 20.04 LTS",    location: "DC-RACK-C1", lastReboot: "2024-11-19 02:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "20 TB", networkIn: "0.2 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "rsync", status: "Running" }, { name: "bacula", status: "Running" }, { name: "ssh", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-005", name: "MAIL-SRV-05",    cpu: 20, memory: 35, disk: 28, network: "Online",  uptime: "60d 11h",  temp: 48, status: "Healthy",  ip: "192.168.1.105", os: "Debian 11",           location: "DC-RACK-B4", lastReboot: "2025-01-18 06:30 AM", cpuCores: 4,  totalRam: "16 GB",  totalDisk: "1 TB",  networkIn: "0.1 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "postfix", status: "Running" }, { name: "dovecot", status: "Running" }, { name: "spamassassin", status: "Running" }, { name: "fail2ban", status: "Running" }] },
    { id: "SRV-006", name: "APP-STAGING-06", cpu: 50, memory: 63, disk: 54, network: "Offline", uptime: "7d 5h",    temp: 0,  status: "Warning",  ip: "192.168.1.106", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A5", lastReboot: "2025-03-12 09:15 AM", cpuCores: 12, totalRam: "48 GB",  totalDisk: "4 TB",  networkIn: "0 GB/s",   networkOut: "0 GB/s",   alerts: ["Server went offline for 2h during 24h window"], services: [{ name: "docker", status: "Running" }, { name: "nginx", status: "Stopped" }, { name: "jenkins", status: "Running" }, { name: "prometheus", status: "Running" }] },
  ],
  "7 Days": [
    { id: "SRV-001", name: "PROD-WEB-01",    cpu: 65, memory: 70, disk: 62, network: "Online",  uptime: "42d 6h",   temp: 66, status: "Healthy",  ip: "192.168.1.101", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A1", lastReboot: "2025-02-05 03:12 AM", cpuCores: 16, totalRam: "64 GB",  totalDisk: "2 TB",  networkIn: "1.0 GB/s", networkOut: "0.6 GB/s", alerts: [], services: [{ name: "nginx", status: "Running" }, { name: "nodejs", status: "Running" }, { name: "redis", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-002", name: "DB-PRIMARY-02",  cpu: 80, memory: 82, disk: 85, network: "Online",  uptime: "15d 3h",   temp: 79, status: "Warning",  ip: "192.168.1.102", os: "CentOS 8",            location: "DC-RACK-B2", lastReboot: "2025-03-04 10:45 AM", cpuCores: 32, totalRam: "128 GB", totalDisk: "10 TB", networkIn: "3.0 GB/s", networkOut: "1.7 GB/s", alerts: ["7-day avg CPU 80% — review required", "Disk trending upward (85%)"], services: [{ name: "mysql", status: "Running" }, { name: "mysqld_safe", status: "Running" }, { name: "backup-agent", status: "Running" }, { name: "monitoring", status: "Running" }] },
    { id: "SRV-003", name: "FILE-SERVER-03", cpu: 28, memory: 45, disk: 88, network: "Online",  uptime: "88d 14h",  temp: 59, status: "Warning",  ip: "192.168.1.103", os: "Windows Server 2022", location: "DC-RACK-A3", lastReboot: "2024-12-20 07:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "50 TB", networkIn: "0.4 GB/s", networkOut: "0.2 GB/s", alerts: ["Disk 7-day avg at 88%"], services: [{ name: "smb", status: "Running" }, { name: "nfs", status: "Running" }, { name: "antivirus", status: "Running" }, { name: "disk-monitor", status: "Running" }] },
    { id: "SRV-004", name: "BACKUP-SRV-04",  cpu: 22, memory: 42, disk: 36, network: "Online",  uptime: "120d 2h",  temp: 54, status: "Healthy",  ip: "192.168.1.104", os: "Ubuntu 20.04 LTS",    location: "DC-RACK-C1", lastReboot: "2024-11-19 02:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "20 TB", networkIn: "0.2 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "rsync", status: "Running" }, { name: "bacula", status: "Running" }, { name: "ssh", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-005", name: "MAIL-SRV-05",    cpu: 17, memory: 33, disk: 27, network: "Online",  uptime: "60d 11h",  temp: 47, status: "Healthy",  ip: "192.168.1.105", os: "Debian 11",           location: "DC-RACK-B4", lastReboot: "2025-01-18 06:30 AM", cpuCores: 4,  totalRam: "16 GB",  totalDisk: "1 TB",  networkIn: "0.1 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "postfix", status: "Running" }, { name: "dovecot", status: "Running" }, { name: "spamassassin", status: "Running" }, { name: "fail2ban", status: "Running" }] },
    { id: "SRV-006", name: "APP-STAGING-06", cpu: 42, memory: 58, disk: 52, network: "Online",  uptime: "7d 5h",    temp: 62, status: "Healthy",  ip: "192.168.1.106", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A5", lastReboot: "2025-03-12 09:15 AM", cpuCores: 12, totalRam: "48 GB",  totalDisk: "4 TB",  networkIn: "0.6 GB/s", networkOut: "0.3 GB/s", alerts: [], services: [{ name: "docker", status: "Running" }, { name: "nginx", status: "Running" }, { name: "jenkins", status: "Running" }, { name: "prometheus", status: "Running" }] },
  ],
  "30 Days": [
    { id: "SRV-001", name: "PROD-WEB-01",    cpu: 60, memory: 65, disk: 60, network: "Online",  uptime: "42d 6h",   temp: 63, status: "Healthy",  ip: "192.168.1.101", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A1", lastReboot: "2025-02-05 03:12 AM", cpuCores: 16, totalRam: "64 GB",  totalDisk: "2 TB",  networkIn: "0.9 GB/s", networkOut: "0.5 GB/s", alerts: [], services: [{ name: "nginx", status: "Running" }, { name: "nodejs", status: "Running" }, { name: "redis", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-002", name: "DB-PRIMARY-02",  cpu: 74, memory: 76, disk: 80, network: "Online",  uptime: "15d 3h",   temp: 75, status: "Warning",  ip: "192.168.1.102", os: "CentOS 8",            location: "DC-RACK-B2", lastReboot: "2025-03-04 10:45 AM", cpuCores: 32, totalRam: "128 GB", totalDisk: "10 TB", networkIn: "2.8 GB/s", networkOut: "1.5 GB/s", alerts: ["30-day avg CPU 74% — plan capacity upgrade", "Disk growing steadily (80%)"], services: [{ name: "mysql", status: "Running" }, { name: "mysqld_safe", status: "Running" }, { name: "backup-agent", status: "Running" }, { name: "monitoring", status: "Running" }] },
    { id: "SRV-003", name: "FILE-SERVER-03", cpu: 25, memory: 42, disk: 84, network: "Online",  uptime: "88d 14h",  temp: 57, status: "Healthy",  ip: "192.168.1.103", os: "Windows Server 2022", location: "DC-RACK-A3", lastReboot: "2024-12-20 07:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "50 TB", networkIn: "0.3 GB/s", networkOut: "0.2 GB/s", alerts: [], services: [{ name: "smb", status: "Running" }, { name: "nfs", status: "Running" }, { name: "antivirus", status: "Running" }, { name: "disk-monitor", status: "Running" }] },
    { id: "SRV-004", name: "BACKUP-SRV-04",  cpu: 18, memory: 38, disk: 34, network: "Online",  uptime: "120d 2h",  temp: 51, status: "Healthy",  ip: "192.168.1.104", os: "Ubuntu 20.04 LTS",    location: "DC-RACK-C1", lastReboot: "2024-11-19 02:00 AM", cpuCores: 8,  totalRam: "32 GB",  totalDisk: "20 TB", networkIn: "0.2 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "rsync", status: "Running" }, { name: "bacula", status: "Running" }, { name: "ssh", status: "Running" }, { name: "cron", status: "Running" }] },
    { id: "SRV-005", name: "MAIL-SRV-05",    cpu: 15, memory: 30, disk: 25, network: "Online",  uptime: "60d 11h",  temp: 45, status: "Healthy",  ip: "192.168.1.105", os: "Debian 11",           location: "DC-RACK-B4", lastReboot: "2025-01-18 06:30 AM", cpuCores: 4,  totalRam: "16 GB",  totalDisk: "1 TB",  networkIn: "0.1 GB/s", networkOut: "0.1 GB/s", alerts: [], services: [{ name: "postfix", status: "Running" }, { name: "dovecot", status: "Running" }, { name: "spamassassin", status: "Running" }, { name: "fail2ban", status: "Running" }] },
    { id: "SRV-006", name: "APP-STAGING-06", cpu: 38, memory: 54, disk: 50, network: "Online",  uptime: "7d 5h",    temp: 60, status: "Healthy",  ip: "192.168.1.106", os: "Ubuntu 22.04 LTS",    location: "DC-RACK-A5", lastReboot: "2025-03-12 09:15 AM", cpuCores: 12, totalRam: "48 GB",  totalDisk: "4 TB",  networkIn: "0.5 GB/s", networkOut: "0.3 GB/s", alerts: [], services: [{ name: "docker", status: "Running" }, { name: "nginx", status: "Running" }, { name: "jenkins", status: "Running" }, { name: "prometheus", status: "Running" }] },
  ],
};

const allPCData = {
  "Live": [
    { id: "PC-045", user: "Parth Sharma", device: "WKSTN-PARTH-45", cpu: 22, ram: 44, disk: 38, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.45",  os: "Windows 11 Pro", department: "Engineering", lastSeen: "2025-03-19 08:28 AM", cpuModel: "Intel Core i7-12700",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:01", antivirusVersion: "v22.3.1",            lastScan: "2025-03-18 11:00 PM", alerts: [],                                                                        installedApps: ["VS Code", "Chrome", "Slack", "Git"] },
    { id: "PC-078", user: "Riya Mehta",   device: "WKSTN-RIYA-78",   cpu: null, ram: null, disk: null, antivirus: "Expired", network: "Offline", status: "Offline",  ip: "10.0.1.78",  os: "Windows 10 Pro", department: "HR",          lastSeen: "2025-03-17 06:12 PM", cpuModel: "Intel Core i5-10400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:78", antivirusVersion: "v19.1.0 (Expired)",  lastScan: "2025-02-14 09:00 AM", alerts: ["Device offline", "Antivirus license expired", "Last seen 2 days ago"], installedApps: ["MS Office", "Chrome", "Zoom"] },
    { id: "PC-033", user: "Aman Singh",   device: "LAPTOP-MGMT-33",  cpu: 67, ram: 79, disk: 61, antivirus: "Active",  network: "Online",  status: "Warning",  ip: "10.0.1.33",  os: "Windows 11 Pro", department: "Management",  lastSeen: "2025-03-19 08:30 AM", cpuModel: "Intel Core i7-1165G7", totalRam: "16 GB", totalDisk: "1 TB SSD",   macAddress: "A1:B2:C3:D4:E5:33", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 02:00 AM", alerts: ["High RAM usage (79%)", "CPU elevated (67%)"],                          installedApps: ["MS Office", "Chrome", "Teams", "Power BI"] },
    { id: "PC-112", user: "Divya Patel",  device: "WKSTN-HR-112",    cpu: 15, ram: 31, disk: 25, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.112", os: "Windows 11 Pro", department: "HR",          lastSeen: "2025-03-19 08:25 AM", cpuModel: "Intel Core i5-12400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:12", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 01:00 AM", alerts: [],                                                                        installedApps: ["MS Office", "Chrome", "Zoom", "SAP"] },
    { id: "PC-091", user: "Nikhil Joshi", device: "WKSTN-IT-91",     cpu: 88, ram: 92, disk: 77, antivirus: "Warning", network: "Online",  status: "Critical", ip: "10.0.1.91",  os: "Windows 10 Pro", department: "IT",          lastSeen: "2025-03-19 08:31 AM", cpuModel: "AMD Ryzen 7 5700G",     totalRam: "32 GB", totalDisk: "2 TB SSD",   macAddress: "A1:B2:C3:D4:E5:91", antivirusVersion: "v21.0.4 (Update needed)", lastScan: "2025-03-15 10:00 PM", alerts: ["CRITICAL: RAM at 92%", "CRITICAL: CPU at 88%", "Antivirus update pending", "Disk at 77%"], installedApps: ["VS Code", "VMware", "Wireshark", "Chrome", "Postman"] },
    { id: "PC-056", user: "Sneha Roy",    device: "LAPTOP-DEV-56",   cpu: 41, ram: 55, disk: 43, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.56",  os: "Ubuntu 22.04",   department: "Engineering", lastSeen: "2025-03-19 08:29 AM", cpuModel: "Intel Core i7-1260P",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:56", antivirusVersion: "ClamAV v0.105",      lastScan: "2025-03-19 03:00 AM", alerts: [],                                                                        installedApps: ["VS Code", "Docker", "Figma", "Firefox", "Git"] },
  ],
  "24 Hours": [
    { id: "PC-045", user: "Parth Sharma", device: "WKSTN-PARTH-45", cpu: 30, ram: 50, disk: 38, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.45",  os: "Windows 11 Pro", department: "Engineering", lastSeen: "2025-03-19 08:28 AM", cpuModel: "Intel Core i7-12700",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:01", antivirusVersion: "v22.3.1",            lastScan: "2025-03-18 11:00 PM", alerts: [],                                                                        installedApps: ["VS Code", "Chrome", "Slack", "Git"] },
    { id: "PC-078", user: "Riya Mehta",   device: "WKSTN-RIYA-78",   cpu: null, ram: null, disk: null, antivirus: "Expired", network: "Offline", status: "Offline",  ip: "10.0.1.78",  os: "Windows 10 Pro", department: "HR",          lastSeen: "2025-03-17 06:12 PM", cpuModel: "Intel Core i5-10400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:78", antivirusVersion: "v19.1.0 (Expired)",  lastScan: "2025-02-14 09:00 AM", alerts: ["Offline for full 24h period", "Antivirus expired"],                     installedApps: ["MS Office", "Chrome", "Zoom"] },
    { id: "PC-033", user: "Aman Singh",   device: "LAPTOP-MGMT-33",  cpu: 60, ram: 72, disk: 60, antivirus: "Active",  network: "Online",  status: "Warning",  ip: "10.0.1.33",  os: "Windows 11 Pro", department: "Management",  lastSeen: "2025-03-19 08:30 AM", cpuModel: "Intel Core i7-1165G7", totalRam: "16 GB", totalDisk: "1 TB SSD",   macAddress: "A1:B2:C3:D4:E5:33", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 02:00 AM", alerts: ["24h avg RAM 72%"],                                                       installedApps: ["MS Office", "Chrome", "Teams", "Power BI"] },
    { id: "PC-112", user: "Divya Patel",  device: "WKSTN-HR-112",    cpu: 18, ram: 33, disk: 25, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.112", os: "Windows 11 Pro", department: "HR",          lastSeen: "2025-03-19 08:25 AM", cpuModel: "Intel Core i5-12400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:12", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 01:00 AM", alerts: [],                                                                        installedApps: ["MS Office", "Chrome", "Zoom", "SAP"] },
    { id: "PC-091", user: "Nikhil Joshi", device: "WKSTN-IT-91",     cpu: 80, ram: 85, disk: 75, antivirus: "Warning", network: "Online",  status: "Critical", ip: "10.0.1.91",  os: "Windows 10 Pro", department: "IT",          lastSeen: "2025-03-19 08:31 AM", cpuModel: "AMD Ryzen 7 5700G",     totalRam: "32 GB", totalDisk: "2 TB SSD",   macAddress: "A1:B2:C3:D4:E5:91", antivirusVersion: "v21.0.4 (Update needed)", lastScan: "2025-03-15 10:00 PM", alerts: ["CRITICAL: 24h avg RAM 85%", "CRITICAL: CPU avg 80%"],                   installedApps: ["VS Code", "VMware", "Wireshark", "Chrome", "Postman"] },
    { id: "PC-056", user: "Sneha Roy",    device: "LAPTOP-DEV-56",   cpu: 44, ram: 58, disk: 43, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.56",  os: "Ubuntu 22.04",   department: "Engineering", lastSeen: "2025-03-19 08:29 AM", cpuModel: "Intel Core i7-1260P",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:56", antivirusVersion: "ClamAV v0.105",      lastScan: "2025-03-19 03:00 AM", alerts: [],                                                                        installedApps: ["VS Code", "Docker", "Figma", "Firefox", "Git"] },
  ],
  "7 Days": [
    { id: "PC-045", user: "Parth Sharma", device: "WKSTN-PARTH-45", cpu: 25, ram: 46, disk: 37, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.45",  os: "Windows 11 Pro", department: "Engineering", lastSeen: "2025-03-19 08:28 AM", cpuModel: "Intel Core i7-12700",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:01", antivirusVersion: "v22.3.1",            lastScan: "2025-03-18 11:00 PM", alerts: [],                                                                        installedApps: ["VS Code", "Chrome", "Slack", "Git"] },
    { id: "PC-078", user: "Riya Mehta",   device: "WKSTN-RIYA-78",   cpu: null, ram: null, disk: null, antivirus: "Expired", network: "Offline", status: "Offline",  ip: "10.0.1.78",  os: "Windows 10 Pro", department: "HR",          lastSeen: "2025-03-17 06:12 PM", cpuModel: "Intel Core i5-10400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:78", antivirusVersion: "v19.1.0 (Expired)",  lastScan: "2025-02-14 09:00 AM", alerts: ["Offline for 3 days this week", "Antivirus expired"],                    installedApps: ["MS Office", "Chrome", "Zoom"] },
    { id: "PC-033", user: "Aman Singh",   device: "LAPTOP-MGMT-33",  cpu: 55, ram: 68, disk: 59, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.33",  os: "Windows 11 Pro", department: "Management",  lastSeen: "2025-03-19 08:30 AM", cpuModel: "Intel Core i7-1165G7", totalRam: "16 GB", totalDisk: "1 TB SSD",   macAddress: "A1:B2:C3:D4:E5:33", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 02:00 AM", alerts: [],                                                                        installedApps: ["MS Office", "Chrome", "Teams", "Power BI"] },
    { id: "PC-112", user: "Divya Patel",  device: "WKSTN-HR-112",    cpu: 14, ram: 29, disk: 24, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.112", os: "Windows 11 Pro", department: "HR",          lastSeen: "2025-03-19 08:25 AM", cpuModel: "Intel Core i5-12400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:12", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 01:00 AM", alerts: [],                                                                        installedApps: ["MS Office", "Chrome", "Zoom", "SAP"] },
    { id: "PC-091", user: "Nikhil Joshi", device: "WKSTN-IT-91",     cpu: 75, ram: 80, disk: 72, antivirus: "Warning", network: "Online",  status: "Warning",  ip: "10.0.1.91",  os: "Windows 10 Pro", department: "IT",          lastSeen: "2025-03-19 08:31 AM", cpuModel: "AMD Ryzen 7 5700G",     totalRam: "32 GB", totalDisk: "2 TB SSD",   macAddress: "A1:B2:C3:D4:E5:91", antivirusVersion: "v21.0.4 (Update needed)", lastScan: "2025-03-15 10:00 PM", alerts: ["7-day avg RAM 80%", "Antivirus update pending"],                         installedApps: ["VS Code", "VMware", "Wireshark", "Chrome", "Postman"] },
    { id: "PC-056", user: "Sneha Roy",    device: "LAPTOP-DEV-56",   cpu: 39, ram: 52, disk: 42, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.56",  os: "Ubuntu 22.04",   department: "Engineering", lastSeen: "2025-03-19 08:29 AM", cpuModel: "Intel Core i7-1260P",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:56", antivirusVersion: "ClamAV v0.105",      lastScan: "2025-03-19 03:00 AM", alerts: [],                                                                        installedApps: ["VS Code", "Docker", "Figma", "Firefox", "Git"] },
  ],
  "30 Days": [
    { id: "PC-045", user: "Parth Sharma", device: "WKSTN-PARTH-45", cpu: 22, ram: 43, disk: 35, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.45",  os: "Windows 11 Pro", department: "Engineering", lastSeen: "2025-03-19 08:28 AM", cpuModel: "Intel Core i7-12700",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:01", antivirusVersion: "v22.3.1",            lastScan: "2025-03-18 11:00 PM", alerts: [],                                                                        installedApps: ["VS Code", "Chrome", "Slack", "Git"] },
    { id: "PC-078", user: "Riya Mehta",   device: "WKSTN-RIYA-78",   cpu: null, ram: null, disk: null, antivirus: "Expired", network: "Offline", status: "Offline",  ip: "10.0.1.78",  os: "Windows 10 Pro", department: "HR",          lastSeen: "2025-03-17 06:12 PM", cpuModel: "Intel Core i5-10400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:78", antivirusVersion: "v19.1.0 (Expired)",  lastScan: "2025-02-14 09:00 AM", alerts: ["Offline multiple times in 30 days", "Antivirus expired for 33 days"], installedApps: ["MS Office", "Chrome", "Zoom"] },
    { id: "PC-033", user: "Aman Singh",   device: "LAPTOP-MGMT-33",  cpu: 50, ram: 62, disk: 57, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.33",  os: "Windows 11 Pro", department: "Management",  lastSeen: "2025-03-19 08:30 AM", cpuModel: "Intel Core i7-1165G7", totalRam: "16 GB", totalDisk: "1 TB SSD",   macAddress: "A1:B2:C3:D4:E5:33", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 02:00 AM", alerts: [],                                                                        installedApps: ["MS Office", "Chrome", "Teams", "Power BI"] },
    { id: "PC-112", user: "Divya Patel",  device: "WKSTN-HR-112",    cpu: 13, ram: 27, disk: 23, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.112", os: "Windows 11 Pro", department: "HR",          lastSeen: "2025-03-19 08:25 AM", cpuModel: "Intel Core i5-12400",   totalRam: "8 GB",  totalDisk: "256 GB SSD", macAddress: "A1:B2:C3:D4:E5:12", antivirusVersion: "v22.3.1",            lastScan: "2025-03-19 01:00 AM", alerts: [],                                                                        installedApps: ["MS Office", "Chrome", "Zoom", "SAP"] },
    { id: "PC-091", user: "Nikhil Joshi", device: "WKSTN-IT-91",     cpu: 70, ram: 75, disk: 68, antivirus: "Warning", network: "Online",  status: "Warning",  ip: "10.0.1.91",  os: "Windows 10 Pro", department: "IT",          lastSeen: "2025-03-19 08:31 AM", cpuModel: "AMD Ryzen 7 5700G",     totalRam: "32 GB", totalDisk: "2 TB SSD",   macAddress: "A1:B2:C3:D4:E5:91", antivirusVersion: "v21.0.4 (Update needed)", lastScan: "2025-03-15 10:00 PM", alerts: ["30-day avg RAM 75%", "Antivirus outdated"],                              installedApps: ["VS Code", "VMware", "Wireshark", "Chrome", "Postman"] },
    { id: "PC-056", user: "Sneha Roy",    device: "LAPTOP-DEV-56",   cpu: 37, ram: 50, disk: 41, antivirus: "Active",  network: "Online",  status: "Healthy",  ip: "10.0.1.56",  os: "Ubuntu 22.04",   department: "Engineering", lastSeen: "2025-03-19 08:29 AM", cpuModel: "Intel Core i7-1260P",   totalRam: "16 GB", totalDisk: "512 GB SSD", macAddress: "A1:B2:C3:D4:E5:56", antivirusVersion: "ClamAV v0.105",      lastScan: "2025-03-19 03:00 AM", alerts: [],                                                                        installedApps: ["VS Code", "Docker", "Figma", "Firefox", "Git"] },
  ],
};

/* label shown in the table header */
const periodLabel = {
  "Live": "Current (Live)",
  "24 Hours": "Avg — Last 24 Hours",
  "7 Days": "Avg — Last 7 Days",
  "30 Days": "Avg — Last 30 Days",
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const getBarColor = (val) => val >= 90 ? "#ef4444" : val >= 70 ? "#f59e0b" : "#22c55e";

const statusConfig = {
  Healthy:  { bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
  Warning:  { bg: "#fef9c3", color: "#b45309", dot: "#f59e0b" },
  Critical: { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
  Offline:  { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8" },
};

const ProgressBar = ({ value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
    <div style={{ flex: 1, height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: getBarColor(value), borderRadius: 99 }} />
    </div>
    <span style={{ fontSize: 13, color: "#374151", minWidth: 34, textAlign: "right" }}>{value}%</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.Offline;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
      {status}
    </span>
  );
};

const NetworkDot = ({ status }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: status === "Online" ? "#16a34a" : "#94a3b8" }}>
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: status === "Online" ? "#22c55e" : "#94a3b8", display: "inline-block" }} />
    {status}
  </span>
);

const StatCard = ({ icon, count, label, bg, color }) => (
  <div style={{ flex: 1, minWidth: 140, background: bg, border: `1.5px solid ${color}22`, borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
    <div style={{ fontSize: 28 }}>{icon}</div>
    <div>
      <div style={{ fontSize: 32, fontWeight: 800, color, lineHeight: 1.1 }}>{count}</div>
      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 3 }}>{label}</div>
    </div>
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>{children}</div>
);

const InfoRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f1f5f9" }}>
    <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 600, textAlign: "right", maxWidth: "58%" }}>{value}</span>
  </div>
);

const ResourceRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500, minWidth: 120 }}>{label}</span>
    <div style={{ flex: 1 }}><ProgressBar value={value} /></div>
  </div>
);

const SectionHeader = ({ index, icon, title, subtitle }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: "#6f74c9", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>SECTION {index}</div>
    <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{icon} {title}</h2>
    <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>{subtitle}</p>
  </div>
);

const SearchFilterBar = ({ value, onChange, placeholder, filter, setFilter, options }) => (
  <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center" }}>
    <div style={{ flex: 1, position: "relative" }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "9px 12px 9px 36px", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: 13, outline: "none", color: "#374151", boxSizing: "border-box", background: "#fff" }} />
    </div>
    <select value={filter} onChange={e => setFilter(e.target.value)}
      style={{ padding: "9px 14px", border: "1.5px solid #e2e8f0", borderRadius: 9, fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer", outline: "none" }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

/* ─────────────────────────────────────────────
   TIME FILTER BAR
───────────────────────────────────────────── */
const TimeFilter = ({ active, setActive }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f1f5f9", padding: "4px 6px", borderRadius: 10 }}>
    {["Live", "24 Hours", "7 Days", "30 Days"].map((t) => (
      <button key={t} onClick={() => setActive(t)}
        style={{ padding: "6px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 13,
          fontWeight: active === t ? 700 : 400,
          background: active === t && t === "Live" ? "#1e293b" : active === t ? "#6f74c9" : "transparent",
          color: active === t ? "#fff" : "#64748b",
          boxShadow: active === t ? "0 1px 4px #0002" : "none", transition: "all .2s" }}>
        {t === "Live"
          ? <span style={{ display: "flex", alignItems: "center", gap: 6 }}>{t}<span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 2px #22c55e44" }} /></span>
          : t}
      </button>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   SERVER DETAIL DRAWER
───────────────────────────────────────────── */
const ServerDetailModal = ({ server, onClose, period }) => {
  if (!server) return null;
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={drawerStyle} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "24px 28px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6f74c9", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>
              Server Details · {periodLabel[period]}
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{server.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{server.id}</span>
              <StatusBadge status={server.status} />
            </div>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f1f5f9", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ padding: "20px 28px 28px", overflowY: "auto", flex: 1 }}>
          {server.alerts.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <SectionLabel>⚠️ Active Alerts</SectionLabel>
              {server.alerts.map((a, i) => (
                <div key={i} style={{ padding: "10px 14px", marginBottom: 8, background: a.startsWith("CRITICAL") ? "#fff1f2" : "#fefce8", borderLeft: `4px solid ${a.startsWith("CRITICAL") ? "#ef4444" : "#f59e0b"}`, borderRadius: "0 8px 8px 0", fontSize: 13, color: "#374151" }}>{a}</div>
              ))}
            </div>
          )}
          <div style={{ marginBottom: 22 }}>
            <SectionLabel>🖥️ System Information</SectionLabel>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "4px 20px" }}>
              <InfoRow label="IP Address" value={server.ip} />
              <InfoRow label="Operating System" value={server.os} />
              <InfoRow label="Location / Rack" value={server.location} />
              <InfoRow label="Last Reboot" value={server.lastReboot} />
              <InfoRow label="CPU Cores" value={server.cpuCores} />
              <InfoRow label="Total RAM" value={server.totalRam} />
              <InfoRow label="Total Disk" value={server.totalDisk} />
              <InfoRow label="Uptime" value={server.uptime} />
              <InfoRow label="Network In" value={server.networkIn} />
              <InfoRow label="Network Out" value={server.networkOut} />
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <SectionLabel>📊 Resource Usage ({period === "Live" ? "Live" : "Avg"})</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "#f8fafc", borderRadius: 12, padding: "16px 20px" }}>
              <ResourceRow label="CPU Usage" value={server.cpu} />
              <ResourceRow label="Memory Usage" value={server.memory} />
              <ResourceRow label="Disk Usage" value={server.disk} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500, minWidth: 120 }}>Temperature</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: server.temp >= 85 ? "#ef4444" : server.temp >= 65 ? "#f59e0b" : "#16a34a" }}>{server.temp > 0 ? `${server.temp}°C` : "N/A"}</span>
              </div>
            </div>
          </div>
          <div>
            <SectionLabel>⚙️ Services</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {server.services.map((svc) => (
                <div key={svc.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#f8fafc", borderRadius: 9, border: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{svc.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: svc.status === "Running" ? "#dcfce7" : "#fee2e2", color: svc.status === "Running" ? "#16a34a" : "#b91c1c" }}>{svc.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PC DETAIL DRAWER
───────────────────────────────────────────── */
const PCDetailModal = ({ pc, onClose, period }) => {
  if (!pc) return null;
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={drawerStyle} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "24px 28px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6f74c9", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 4 }}>
              PC Details · {periodLabel[period]}
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{pc.user}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{pc.id} · {pc.device}</span>
              <StatusBadge status={pc.status} />
            </div>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "#f1f5f9", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ padding: "20px 28px 28px", overflowY: "auto", flex: 1 }}>
          {pc.alerts.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <SectionLabel>⚠️ Active Alerts</SectionLabel>
              {pc.alerts.map((a, i) => (
                <div key={i} style={{ padding: "10px 14px", marginBottom: 8, background: a.startsWith("CRITICAL") ? "#fff1f2" : "#fefce8", borderLeft: `4px solid ${a.startsWith("CRITICAL") ? "#ef4444" : "#f59e0b"}`, borderRadius: "0 8px 8px 0", fontSize: 13, color: "#374151" }}>{a}</div>
              ))}
            </div>
          )}
          <div style={{ marginBottom: 22 }}>
            <SectionLabel>💻 Device Information</SectionLabel>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "4px 20px" }}>
              <InfoRow label="IP Address" value={pc.ip} />
              <InfoRow label="MAC Address" value={pc.macAddress} />
              <InfoRow label="Operating System" value={pc.os} />
              <InfoRow label="Department" value={pc.department} />
              <InfoRow label="CPU Model" value={pc.cpuModel} />
              <InfoRow label="Total RAM" value={pc.totalRam} />
              <InfoRow label="Total Disk" value={pc.totalDisk} />
              <InfoRow label="Last Seen" value={pc.lastSeen} />
            </div>
          </div>
          {pc.cpu != null && (
            <div style={{ marginBottom: 22 }}>
              <SectionLabel>📊 Resource Usage ({period === "Live" ? "Live" : "Avg"})</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "#f8fafc", borderRadius: 12, padding: "16px 20px" }}>
                <ResourceRow label="CPU Usage" value={pc.cpu} />
                <ResourceRow label="RAM Usage" value={pc.ram} />
                <ResourceRow label="Disk Usage" value={pc.disk} />
              </div>
            </div>
          )}
          <div style={{ marginBottom: 22 }}>
            <SectionLabel>🛡️ Antivirus Status</SectionLabel>
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "4px 20px" }}>
              <InfoRow label="Status" value={<span style={{ fontWeight: 700, color: pc.antivirus === "Active" ? "#16a34a" : "#b91c1c" }}>{pc.antivirus}</span>} />
              <InfoRow label="Version" value={pc.antivirusVersion} />
              <InfoRow label="Last Scan" value={pc.lastScan} />
            </div>
          </div>
          <div>
            <SectionLabel>📦 Key Installed Applications</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {pc.installedApps.map((app) => (
                <span key={app} style={{ padding: "5px 14px", background: "#eff6ff", color: "#3b82f6", borderRadius: 99, fontSize: 12, fontWeight: 600, border: "1px solid #bfdbfe" }}>{app}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const ServerHealthPage = () => {
  const [timeFilter, setTimeFilter] = useState("Live");
  const [serverSearch, setServerSearch] = useState("");
  const [serverFilter, setServerFilter] = useState("All");
  const [pcSearch, setPcSearch] = useState("");
  const [pcFilter, setPcFilter] = useState("All");
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedPC, setSelectedPC] = useState(null);

  // ← Data switches based on selected time period
  const serverData = allServerData[timeFilter];
  const pcData     = allPCData[timeFilter];

  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const filteredServers = serverData.filter(s =>
    (s.id.toLowerCase().includes(serverSearch.toLowerCase()) || s.name.toLowerCase().includes(serverSearch.toLowerCase()))
    && (serverFilter === "All" || s.status === serverFilter)
  );
  const filteredPCs = pcData.filter(p =>
    (p.id.toLowerCase().includes(pcSearch.toLowerCase()) || p.user.toLowerCase().includes(pcSearch.toLowerCase()) || p.device.toLowerCase().includes(pcSearch.toLowerCase()))
    && (pcFilter === "All" || p.status === pcFilter)
  );

  const srvHealthy  = serverData.filter(s => s.status === "Healthy").length;
  const srvWarning  = serverData.filter(s => s.status === "Warning").length;
  const srvCritical = serverData.filter(s => s.status === "Critical").length;
  const pcHealthy   = pcData.filter(p => p.status === "Healthy").length;
  const pcWarning   = pcData.filter(p => p.status === "Warning").length;
  const pcOffline   = pcData.filter(p => p.status === "Offline").length;

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "32px 36px", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#6f74c9", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>ITSM PLATFORM</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a" }}>🖥️ Server & PC Health Monitoring</h1>
          <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 14 }}>Real-time performance, uptime, and alerts across all infrastructure.</p>
        </div>
        <TimeFilter active={timeFilter} setActive={(t) => { setTimeFilter(t); setSelectedServer(null); setSelectedPC(null); }} />
      </div>

      {/* Period banner */}
      {timeFilter !== "Live" && (
        <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 10, padding: "10px 18px", marginBottom: 24, fontSize: 13, color: "#1d4ed8", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
          📅 Showing average metrics for the <strong>last {timeFilter}</strong>. Click any row's "View Details" to see historical alerts for that period.
        </div>
      )}

      {/* ── Section 01 ── */}
      <SectionHeader index="01" icon="🖥️" title="Server Health Monitoring" subtitle={`Monitoring ${serverData.length} servers across all environments`} />
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard icon="🖥️" count={serverData.length} label="Total Servers"    bg="#f1f5f9" color="#475569" />
        <StatCard icon="✅" count={srvHealthy}          label="Healthy Servers"  bg="#f0fdf4" color="#16a34a" />
        <StatCard icon="⚠️" count={srvWarning}           label="Warning Servers"  bg="#fefce8" color="#b45309" />
        <StatCard icon="🚨" count={srvCritical}          label="Critical Servers" bg="#fef2f2" color="#b91c1c" />
      </div>

      <div style={tableCard}>
        <SearchFilterBar value={serverSearch} onChange={setServerSearch} placeholder="Search server ID or name..." filter={serverFilter} setFilter={setServerFilter} options={["All","Healthy","Warning","Critical"]} />
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Server ID","Server Name",`CPU % (${timeFilter === "Live" ? "Live" : "Avg"})`,`Memory % (${timeFilter === "Live" ? "Live" : "Avg"})`,`Disk % (${timeFilter === "Live" ? "Live" : "Avg"})`,"Network","Uptime","Temp","Status","Action"].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredServers.map((s, i) => (
                <tr key={s.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ ...td, color: "#6f74c9", fontWeight: 600 }}>{s.id}</td>
                  <td style={{ ...td, fontWeight: 500 }}>{s.name}</td>
                  <td style={td}><ProgressBar value={s.cpu} /></td>
                  <td style={td}><ProgressBar value={s.memory} /></td>
                  <td style={td}><ProgressBar value={s.disk} /></td>
                  <td style={td}><NetworkDot status={s.network} /></td>
                  <td style={td}>{s.uptime}</td>
                  <td style={{ ...td, fontWeight: 600, color: s.temp >= 85 ? "#ef4444" : s.temp >= 65 ? "#f59e0b" : "#374151" }}>{s.temp > 0 ? `${s.temp}°C` : "—"}</td>
                  <td style={td}><StatusBadge status={s.status} /></td>
                  <td style={td}><button onClick={() => setSelectedServer(s)} style={actionBtn}>View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={tableFooter}>
          <span>Showing {filteredServers.length} of {serverData.length} servers</span>
          <span>🕐 {now}</span>
        </div>
      </div>

      {/* ── Section 02 ── */}
      <SectionHeader index="02" icon="💻" title="PC / Workstation Health Monitoring" subtitle={`Monitoring ${pcData.length} workstations and laptops`} />
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard icon="💻" count={pcData.length} label="Total PCs"   bg="#f1f5f9" color="#475569" />
        <StatCard icon="✅" count={pcHealthy}     label="Healthy PCs"  bg="#f0fdf4" color="#16a34a" />
        <StatCard icon="⚠️" count={pcWarning}      label="Warning PCs"  bg="#fefce8" color="#b45309" />
        <StatCard icon="🔴" count={pcOffline}      label="Offline PCs"  bg="#fef2f2" color="#b91c1c" />
      </div>

      <div style={tableCard}>
        <SearchFilterBar value={pcSearch} onChange={setPcSearch} placeholder="Search PC ID, user, or device..." filter={pcFilter} setFilter={setPcFilter} options={["All","Healthy","Warning","Critical","Offline"]} />
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["PC ID","User Name","Device Name",`CPU % (${timeFilter === "Live" ? "Live" : "Avg"})`,`RAM % (${timeFilter === "Live" ? "Live" : "Avg"})`,`Disk % (${timeFilter === "Live" ? "Live" : "Avg"})`, "Antivirus","Network","Status","Action"].map(h => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPCs.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ ...td, color: "#6f74c9", fontWeight: 600 }}>{p.id}</td>
                  <td style={{ ...td, fontWeight: 500 }}>{p.user}</td>
                  <td style={td}>{p.device}</td>
                  <td style={td}>{p.cpu != null ? <ProgressBar value={p.cpu} /> : <span style={{ color: "#cbd5e1" }}>—</span>}</td>
                  <td style={td}>{p.ram != null ? <ProgressBar value={p.ram} /> : <span style={{ color: "#cbd5e1" }}>—</span>}</td>
                  <td style={td}>{p.disk != null ? <ProgressBar value={p.disk} /> : <span style={{ color: "#cbd5e1" }}>—</span>}</td>
                  <td style={td}>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 99, color: p.antivirus === "Active" ? "#16a34a" : p.antivirus === "Expired" ? "#b91c1c" : "#b45309", background: p.antivirus === "Active" ? "#dcfce7" : p.antivirus === "Expired" ? "#fee2e2" : "#fef9c3" }}>{p.antivirus}</span>
                  </td>
                  <td style={td}><NetworkDot status={p.network} /></td>
                  <td style={td}><StatusBadge status={p.status} /></td>
                  <td style={td}><button onClick={() => setSelectedPC(p)} style={actionBtn}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={tableFooter}>
          <span>Showing {filteredPCs.length} of {pcData.length} PCs</span>
          <span>🕐 {now}</span>
        </div>
      </div>

      {/* Drawers */}
      <ServerDetailModal server={selectedServer} onClose={() => setSelectedServer(null)} period={timeFilter} />
      <PCDetailModal     pc={selectedPC}         onClose={() => setSelectedPC(null)}     period={timeFilter} />
    </div>
  );
};

/* ─── Shared styles ─── */
const tableCard   = { background: "#fff", borderRadius: 14, padding: "20px 22px", marginBottom: 40, boxShadow: "0 1px 6px #0000000a, 0 0 0 1px #e2e8f0" };
const tableStyle  = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
const th          = { textAlign: "left", padding: "10px 12px", fontWeight: 600, color: "#64748b", fontSize: 12, borderBottom: "1.5px solid #f1f5f9", whiteSpace: "nowrap" };
const td          = { padding: "12px 12px", color: "#374151", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" };
const tableFooter = { display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: 12, marginTop: 12 };
const actionBtn   = { padding: "6px 14px", borderRadius: 7, border: "1.5px solid #e2e8f0", background: "#fff", color: "#374151", fontSize: 12, cursor: "pointer", fontWeight: 500 };
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 1000, display: "flex", justifyContent: "flex-end", backdropFilter: "blur(2px)" };
const drawerStyle  = { width: "100%", maxWidth: 500, background: "#fff", height: "100vh", display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px #0000001a" };

export default ServerHealthPage;