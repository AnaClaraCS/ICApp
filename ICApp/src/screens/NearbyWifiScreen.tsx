import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import { usePermissionContext } from '../context/PermissonsContext';

const WifiScreen = () => {
  const [wifiList, setWifiList] = useState<string[]>([]);
  const { hasLocationPermission, requestLocationPermission } = usePermissionContext();

  const loadWifiNetworks = async () => {
    if (!hasLocationPermission) {
      Alert.alert(
        'Permissão necessária',
        'Você precisa conceder permissão de localização para acessar as redes Wi-Fi.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const networks = await WifiManager.loadWifiList();
      const ssids = networks.map((network) => network.SSID);
      setWifiList(ssids);
    } catch (error) {
      console.error('Erro ao carregar redes Wi-Fi:', error);
    }
  };

  useEffect(() => {
    if (hasLocationPermission) {
      loadWifiNetworks();
    }
  }, [hasLocationPermission]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redes Wi-Fi Próximas</Text>
      <FlatList
        data={wifiList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
      <Button
        title="Atualizar Redes"
        onPress={() => {
          if (!hasLocationPermission) {
            requestLocationPermission();
          } else {
            loadWifiNetworks();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default WifiScreen;
