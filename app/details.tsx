import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, StyleSheet, Pressable } from "react-native";
import { Button, Text, YStack, Main, Form } from 'tamagui';
import { Container} from '../tamagui.config';

import { BasicCards } from "~/app/components/BasicCard";
import EditModal from "~/app/components/EditModal";
import axios, { AxiosResponse } from "axios";

export default function Details() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState([]);
  const baseUrl = 'http://10.0.8.239:8081';

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

  return (
    <Container style={{ backgroundColor: 'black' }}>
      <Main>
        <YStack>
          <ScrollView>
            <View style={styles.panel}>
              <Text color="white" fontWeight="bold" fontSize={38}>Panel</Text>
              <BasicCards data={data} setShowEditModal={openEditModal}></BasicCards>
            </View>
          </ScrollView>
          <Pressable style={styles.addButton} onPress={createNewFeature}>
            <Image source={require('../assets/plus.png')} style={styles.plusIcon} />
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
