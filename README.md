# ARBVPN
> **A lightweight, open‑source Android VPN client for your own WireGuard server.**

![Forks](https://img.shields.io/github/forks/Lukecele/ARBVPN.svg)
![Issues](https://img.shields.io/github/issues/Lukecele/ARBVPN.svg)
![License](https://img.shields.io/github/license/Lukecele/ARBVPN.svg)

ARBVPN is a mobile client for connecting to **your own WireGuard server**. It provides a single connect/disconnect control and a setup notice when the default configuration is incomplete. You supply the server, client keys, and peer configuration; no hosted VPN infrastructure is included.

## Platform and project status

- **Android:** the repository includes a native Android project and uses `react-native-wireguard-vpn`. The build targets SDK 36 with a minimum SDK of 24 (Android 7.0).
- **iOS:** project files and an `ios` script exist, but the app has no configured Packet Tunnel extension or VPN entitlements. iOS VPN support is not established.
- **Verification:** Android builds and live VPN connections have not been verified for this documentation update. CI checks TypeScript; it does not test a native tunnel.

### Interface and connection state

The current screen displays `ARB INC VPN`, a circular action button, and a status label. Before setup it shows `SETUP REQUIRED`, `CONFIGURE SERVER`, and `Unconfigured (Standby)`.

After configuration, the button offers `1-TAP CONNECT`. The UI switches to `Connected (Encrypted)` when the native `connect()` promise resolves, and back after `disconnect()` resolves. This label reflects local UI state: the app does not poll native status, verify a WireGuard handshake, or measure traffic. Verify the tunnel on your device and server before relying on that label.

No interface screenshot is included: this documentation environment lacks Java, the Android SDK, and an emulator, and the repository contains no existing app screenshots with verified provenance. The [social card](docs/assets/social-card.png) is promotional artwork, not an app screenshot or evidence of a working connection.

## Requirements

- Node.js **22.11.0 or newer** and npm, as declared in [package.json](package.json).
- JDK 17 and an Android development environment with SDK 36, Build Tools 36.0.0, and NDK 27.1.12297006, matching [the Android build configuration](android/build.gradle).
- An Android device with USB debugging enabled or an emulator (API 24 or newer).
- Your own reachable WireGuard server, a registered client peer, and matching keys, addresses, routes, and DNS settings.

## Get started

### 1. Install dependencies

```bash
git clone https://github.com/Lukecele/ARBVPN.git
cd ARBVPN
npm ci --legacy-peer-deps --no-audit --no-fund
```

The current lockfile requires legacy peer handling because the VPN dependency declares an Expo peer dependency. Installation with this option has been verified; it bypasses peer resolution and does not establish native runtime compatibility.

### 2. Configure your peer

Edit [src/config/vpnConfig.ts](src/config/vpnConfig.ts):

| Field | Value to supply |
| --- | --- |
| `privateKey` | Your client's WireGuard private key |
| `publicKey` | Your server's WireGuard public key |
| `presharedKey` | Matching preshared key, if used; otherwise empty |
| `serverAddress`, `serverPort` | Your server's reachable hostname or IP and UDP port |
| `address` | The tunnel address assigned to this client, in CIDR notation |
| `dns` | DNS resolvers reachable through your configuration |
| `allowedIPs` | Routes to send through the tunnel |

Replace all key and server placeholders. The example address, DNS resolvers, port, and full-tunnel routes are defaults, not provisioning for a working server. Configure the corresponding peer and routing on your server separately.

The setup guard only checks selected placeholders and nonempty values; it does not validate keys, routes, server reachability, or a successful handshake. Keep actual credentials out of commits and screenshots. Configuration is bundled into the app, so do not distribute a build containing your personal private key.

### 3. Start Metro and run Android

In one terminal:

```bash
npm start
```

With a device or emulator available, in another terminal:

```bash
npm run android
```

Accept Android's VPN permission prompt if requested. These commands match the package scripts; native startup was not executed for this documentation update because the Android toolchain is unavailable.

## Development

The UI and connection calls live in [App.tsx](App.tsx); peer defaults and the setup guard live in [vpnConfig.ts](src/config/vpnConfig.ts).

```bash
npx tsc --noEmit       # CI type check
npm test -- --runInBand
npm run lint
```

See [contribution instructions](CONTRIBUTING.md) and the [security policy](SECURITY.md). For presentation assets and sharing copy, see [the sharing guide](docs/sharing.md).

## Follow the project

Explore [Lukecele's projects](https://github.com/Lukecele), follow the author for future work, or [star ARBVPN](https://github.com/Lukecele/ARBVPN) to find it again. Bug reports and focused contributions are welcome through the repository.

## License

[MIT](LICENSE).
