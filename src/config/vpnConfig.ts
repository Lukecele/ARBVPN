import { WireGuardConfig } from 'react-native-wireguard-vpn';

/**
 * WireGuard VPN Peer Configuration
 * 
 * SECURITY NOTICE:
 * To use this app, replace these placeholder values with your own WireGuard server details.
 * Never commit your real private keys to a public GitHub repository.
 */
export const DEFAULT_WG_CONFIG: WireGuardConfig = {
  privateKey: 'YOUR_CLIENT_PRIVATE_KEY_HERE',
  publicKey: 'YOUR_SERVER_PUBLIC_KEY_HERE',
  presharedKey: '', // Optional preshared key
  serverAddress: 'YOUR_WIREGUARD_SERVER_IP',
  serverPort: 51820,
  address: '10.66.66.2/32',
  dns: ['1.1.1.1', '1.0.0.1'],
  allowedIPs: ['0.0.0.0/0', '::/0']
};

export const isConfigured = (config: WireGuardConfig): boolean => {
  return (
    config.serverAddress !== 'YOUR_WIREGUARD_SERVER_IP' &&
    config.privateKey !== 'YOUR_CLIENT_PRIVATE_KEY_HERE' &&
    Boolean(config.serverAddress && config.privateKey && config.publicKey)
  );
};
