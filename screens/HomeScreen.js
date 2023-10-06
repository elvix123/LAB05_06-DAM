import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Lista de Fotos</Text>
      <Button
        title="Ver Detalles"
        onPress={() => navigation.navigate('Details')}
        
      />
    </View>
  );
}
