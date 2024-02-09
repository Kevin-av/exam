import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, StyleSheet, Pressable } from "react-native";
import { Button, Text, YStack, Main, Form } from 'tamagui';
import { Container} from '../tamagui.config';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';

import { BasicCards } from "~/app/components/BasicCard";
import EditModal from "~/app/components/EditModal";
import axios from "axios";

export default function Details() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([]);
  const baseUrl = 'http://10.0.3.56:8081';
  const router = useRouter();

  useEffect(() => {
    fetchFilmsData("film");
  }, []);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const fetchFilmsData = async (ruta) => {
    try {
      const url = `${baseUrl}/${ruta}`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const deleteFeature = async (ruta, id) => {
    try {
      const url = `${baseUrl}/${ruta}`;
      console.log(url)
      const response = await axios.delete(`${url}/delete/${id}`);
      console.log(response.data);
      fetchFilmsData("film");
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  const navigateToScene = (id) => {
    router.navigate('page/Scene', { id });
  };

  const BackButton = () => (
    <Button
      unstyled
      flexDirection="row"
      backgroundColor="black"
      padding={8}
      borderRadius={10}
      pressStyle={{ opacity: 0.5 }}
      onPress={router.back}
      alignItems={'center'}
      icon={<Feather name="home" size={16} color="white" />}>
      <Text color="white">Inicio</Text>
    </Button>
  );

  return (
    <Container style={{ backgroundColor: 'black' }}>
      <Stack.Screen options={{ headerTitleStyle:{color: 'white'},headerStyle:{backgroundColor: 'white'}, title: '', headerLeft: () => <BackButton /> }} />
      <Main>
        <YStack>
          <ScrollView>
            <View style={styles.panel}>
              <Text color="white" fontWeight="bold" fontSize={38}>Panel</Text>
              <BasicCards data={data} setShowEditModal={openEditModal} deleteFeature={deleteFeature} navigateToScene={navigateToScene} />
            </View>
          </ScrollView>
          <Pressable style={styles.addButton} onPress={openEditModal}>
            <Image source={require('../assets/plus.png')} style={styles.plusIcon} />
          </Pressable>
        </YStack>
      </Main>
      {showEditModal &&
        <EditModal closeEditModal={closeEditModal}></EditModal>
      }
    </Container>
  );
}


const styles = StyleSheet.create({
  panel: {
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 2,
    borderRadius: 50,
    padding: 10,
  },
  plusIcon: {
    height: 45,
    width: 45
  }
});