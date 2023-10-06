import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

export default function UploadScreen() {
    const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Solicitar permisos de acceso a la galería de imágenes cuando se monta la pantalla
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Se requiere permiso para acceder a la galería de imágenes.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      // Llamar a la función para guardar la imagen
      saveImage(result.uri);
    }
  };

  

  const saveImage = async (uri) => {
    try {
      const fileName = uri.split('/').pop();
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });
    
      // Navega a la pantalla "Home" y pasa la URI de la imagen como parámetro
      navigation.navigate('Home', { imageUri: fileUri });
    
      alert('Imagen guardada con éxito.');
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      alert('Error al guardar la imagen.');
    }
  };
  

  return (
    <View>
      <Text>Subir una Nueva Foto</Text>
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
