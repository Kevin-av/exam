import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, StyleSheet, Pressable } from "react-native";
import { Button, Text, YStack, Main, Form } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';

import { SceneCard } from "~/app/page/SceneCard";
import EditModal from "~/app/page/EditModal";
import axios, { AxiosResponse } from "axios";

export default function Details() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([]);
  const baseUrl = 'http://192.168.18.94:8081';
  const router = useRouter();

  useEffect(() => {
    fetchScenesData("scene"); 
  }, []);

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const createNewFeature = () => {
    openEditModal();
  };

  const fetchScenesData = async (ruta) => { 
    try {
      const url = `${baseUrl}/${ruta}`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const deleteScene = async (ruta, id) => {
    try {
      const url = `${baseUrl}/${ruta}`;
      console.log(url)
      const response = await axios.delete(`${url}/delete/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting scene:', error);
    }
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
              <SceneCard data={data} showEditModal={openEditModal} deleteScene={deleteScene} />
            </View>
          </ScrollView>
          <Pressable style={styles.addButton} onPress={createNewFeature}>
            <Image source={require('~/assets/plus.png')} style={styles.plusIcon} />
          </Pressable>
        </YStack>
      </Main>
      {showEditModal &&
        <EditModal data={data} closeEditModal={closeEditModal} isCreate={true}></EditModal>
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
