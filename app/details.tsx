import React, { useState, useEffect } from "react";
import { ScrollView, Pressable, View, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Text, YStack, Main, Form } from 'tamagui';
import { Container} from '../tamagui.config';

import { BasicCards } from "~/app/components/BasicCard";
import EditModal from "~/app/components/EditModal";
import axios, { AxiosResponse } from "axios";

export default function Details() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([]);
  const baseUrl = 'http://10.10.2.44:8081';

  useEffect(() => {
    fetchFilmsData("film");
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

  const fetchFilmsData = async (ruta) => {
    const url = `${baseUrl}/${ruta}`;
    const response = await axios.get(url);
    setData(response.data);
    console.log(response.data);
  };

  const saveFilm = async (ruta,form) => {
    const url = `${baseUrl}/${ruta}`;
    const response = await axios.post(url,form);
    setData (response.data);
    console.log(response.data);
  }

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
      <Main>
        <YStack>
          <ScrollView>
            <Text color="white" fontWeight="bold" fontSize={38}>Panel</Text>
            <BasicCards data={data} setShowEditModal={openEditModal}></BasicCards>
          </ScrollView>
        </YStack>
        <View style={{
          position: "absolute",
          bottom: -600,
          right: 0
        }}>
          <Pressable
            style={{ borderWidth: 1, borderRadius: 50}}
            onPress={createNewFeature}>
            <Image source={require('../assets/plus.png')}
                   style={{ width: 20, height: 20 }}
                   />
          </Pressable>
        </View>
      </Main>
      {showEditModal &&
        <EditModal data={data} closeEditModal={closeEditModal} isCreate={true}></EditModal>
      }
    </Container>
  );
}