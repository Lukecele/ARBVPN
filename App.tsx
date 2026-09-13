import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import WireguardVpn, { WireGuardConfig } from 'react-native-wireguard-vpn';
import { DEFAULT_WG_CONFIG, isConfigured } from './src/config/vpnConfig';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [configReady, setConfigReady] = useState(false);

  useEffect(() => {
    const ready = isConfigured(DEFAULT_WG_CONFIG);
    setConfigReady(ready);

    if (ready) {
      WireguardVpn.initialize()
        .catch(err => {
          console.error('Init Error:', err);
        });
    }
  }, []);

  const toggleVpn = async () => {
    if (!configReady) {
      Alert.alert(
        'Configuration Required',
        'No active WireGuard server is configured. Please insert your server IP, private key, and public key in src/config/vpnConfig.ts.'
      );
      return;
    }

    try {
      if (isConnected) {
        await WireguardVpn.disconnect();
        setIsConnected(false);
      } else {
        await WireguardVpn.connect(DEFAULT_WG_CONFIG);
        setIsConnected(true);
      }
    } catch (err) {
      console.error('VPN Error:', err);
      Alert.alert('VPN Connection Error', JSON.stringify(err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ARB INC VPN</Text>
      
      {!configReady && (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ SETUP REQUIRED</Text>
          <Text style={styles.warningText}>
            This open-source build contains no bundled private keys.
            To connect, configure your own WireGuard peer credentials in:
          </Text>
          <Text style={styles.codeText}>src/config/vpnConfig.ts</Text>
        </View>
      )}

      <TouchableOpacity 
         style={[
           styles.btn, 
           !configReady ? styles.unconfigured : isConnected ? styles.on : styles.off
         ]} 
         onPress={toggleVpn}
         activeOpacity={0.8}
      >
        <Text style={styles.btnText}>
          {!configReady ? 'CONFIGURE SERVER' : isConnected ? 'DISCONNECT' : '1-TAP CONNECT'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.statusText}>
        Status: {!configReady ? 'Unconfigured (Standby)' : isConnected ? 'Connected (Encrypted)' : 'Ready to Connect'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#0a0a0c', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  warningBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#ef4444',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    maxWidth: 340,
    alignItems: 'center'
  },
  warningTitle: { color: '#f87171', fontWeight: 'bold', fontSize: 14, marginBottom: 6 },
  warningText: { color: '#d1d5db', fontSize: 13, textAlign: 'center', lineHeight: 18 },
  codeText: { color: '#fbbf24', fontFamily: 'monospace', fontSize: 12, marginTop: 6 },
  btn: { width: 190, height: 190, borderRadius: 95, justifyContent: 'center', alignItems: 'center', borderWidth: 4, marginBottom: 24 },
  unconfigured: { borderColor: '#71717a', backgroundColor: '#18181b' },
  off: { borderColor: '#3f3f46', backgroundColor: '#18181b' },
  on: { borderColor: '#10b981', backgroundColor: '#064e3b' },
  btnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 15, paddingHorizontal: 12 },
  statusText: { color: '#a1a1aa', fontSize: 13 }
});
