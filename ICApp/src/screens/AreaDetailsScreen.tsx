import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database'; // Importando as funções necessárias
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { db } from '../firebaseConfig'; // Importando a configuração do Firebase

type RootStackParamList = {
  Areas: undefined;
  AreaDetails: { areaId: string };
};

type AreaDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'AreaDetails'>;

const AreaDetailsScreen = ({ route }: AreaDetailsScreenProps) => {
  const { areaId } = route.params;
  const [areaDetails, setAreaDetails] = useState<any>(null);

  useEffect(() => {
    const fetchAreaDetails = async () => {
      try {
        const areaRef = ref(db, `/areas/${areaId}`); // Ref para acessar a área específica
        const snapshot = await get(areaRef); // Usando get() para pegar os dados
        if (snapshot.exists()) {
          setAreaDetails(snapshot.val());
        } else {
          console.log("Área não encontrada");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da área:", error);
      }
    };

    fetchAreaDetails();
  }, [areaId]);

  if (!areaDetails) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Descrição: {areaDetails.descricao}</Text>
      <Text style={styles.text}>Andar: {areaDetails.andar}</Text>
      <Image 
        source={{ uri: areaDetails.imagem }} 
        style={styles.image} 
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 300, // Largura da imagem
    height: 200, // Altura da imagem
    borderRadius: 10, // Bordas arredondadas (opcional)
  },
});

export default AreaDetailsScreen;
