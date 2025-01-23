import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';  // Funções do Firebase
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { db } from '../firebaseConfig';  // Importando a configuração do Firebase

type RootStackParamList = {
  Areas: undefined;
  AreaDetails: { areaId: string };
};

type AreasScreenProps = NativeStackScreenProps<RootStackParamList, 'Areas'>;

const AreasScreen = ({ navigation }: AreasScreenProps) => {
  const [areas, setAreas] = useState<any[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasRef = ref(db, '/areas');  // Ref para acessar todas as áreas
        const snapshot = await get(areasRef);  // Pegando todos os dados das áreas
        if (snapshot.exists()) {
          setAreas(Object.entries(snapshot.val()).map(([id, area]) => ({
            idArea: id,
            ...(typeof area === 'object' && area !== null ? area : {})
          })));
        } else {
          console.log("Nenhuma área encontrada");
        }
      } catch (error) {
        console.error("Erro ao buscar áreas:", error);
      }
    };

    fetchAreas();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => navigation.navigate('AreaDetails', { areaId: item.idArea })}>
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text>{item.descricao}</Text>
        <Text>{item.andar}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={areas}
        renderItem={renderItem}
        keyExtractor={(item) => item.idArea}
      />
    </View>
  );
};

export default AreasScreen;
