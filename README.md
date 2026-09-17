# 🛡️ ARBVPN — React Native WireGuard 1-Tap Client

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React Native: 0.84](https://img.shields.io/badge/React_Native-0.84-61dafb?logo=react&logoColor=black)](https://reactnative.dev/)
[![WireGuard](https://img.shields.io/badge/VPN-WireGuard_Protocol-88171a?logo=wireguard&logoColor=white)](https://www.wireguard.com/)
[![Android](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android&logoColor=white)](https://developer.android.com/)

> ⚠️ **Configuration Required & Security Notice**:  
> For security, this open-source repository **does not include bundled server IP addresses or active private keys**. Before connecting, you must configure your own WireGuard server details in [`src/config/vpnConfig.ts`](./src/config/vpnConfig.ts). The mobile interface will automatically notify the user if placeholder values are detected.

---

## 🏛️ Features

- **1-Tap Connect & Disconnect:** Minimal, responsive mobile interface featuring visual connection states and animated feedback.
- **Native WireGuard Protocol:** Direct integration with native Android VPN subsystems via `react-native-wireguard-vpn`.
- **Decoupled Architecture:** Clean separation between connection state management, UI rendering, and cryptographic peer credentials.
- **Fail-Safe UI Guardrails:** The client inspects configuration integrity before attempting tunnel initialization, preventing crashes or silent connection drops.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph UI ["Mobile Application Layer (React Native)"]
        UserUI["1-Tap Connection Screen<br>(Animated Handshake State)"]
        ConfigGuard["Config Guard and Validation<br>(Checks Placeholder Credentials)"]
    end

    subgraph NativeBridge ["Native Subsystems Layer"]
        Bridge["React Native WireGuard Bridge<br>(react-native-wireguard-vpn)"]
        VpnService["Android VpnService Subsystem<br>(Tun Interface Setup)"]
    end

    subgraph Tunnel ["Encrypted Network Layer"]
        CryptoTunnel["ChaCha20-Poly1305 Tunnel<br>(UDP Port 51820)"]
        Gateway["Remote WireGuard Peer<br>(Secure VPN Gateway)"]
    end

    UserUI --> ConfigGuard
    ConfigGuard --> Bridge
    Bridge --> VpnService
    VpnService --> CryptoTunnel
    CryptoTunnel --> Gateway
```

---

## 🚀 Quick Start & Setup

### 1. Prerequisites
- Node.js 20+
- Android Studio & Android SDK (for Android build)
- Java 17 (recommended for modern React Native Android toolchains)

### 2. Installation

```bash
# Clone repository
git clone https://github.com/Lukecele/ARBVPN.git
cd ARBVPN

# Install dependencies
npm install
```

### 3. Configure Your WireGuard Peer

Open `src/config/vpnConfig.ts` and replace the placeholder values with your WireGuard server credentials:

```typescript
export const DEFAULT_WG_CONFIG: WireGuardConfig = {
  privateKey: '<YOUR_CLIENT_PRIVATE_KEY>',
  publicKey: '<YOUR_SERVER_PUBLIC_KEY>',
  presharedKey: '', // Optional
  serverAddress: '<YOUR_SERVER_IP_OR_DOMAIN>',
  serverPort: 51820,
  address: '10.66.66.2/32',
  dns: ['1.1.1.1', '1.0.0.1'],
  allowedIPs: ['0.0.0.0/0', '::/0']
};
```

### 4. Run on Android Device / Emulator

```bash
npm run android
```

---

## 📜 License

Distributed under the [MIT License](./LICENSE). Open-source client for privacy-conscious mobile developers.
