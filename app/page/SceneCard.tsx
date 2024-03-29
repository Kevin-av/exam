import React from "react";
import { H3, H5, H6 } from "tamagui";
import { Card, XStack, Image } from 'tamagui';
import { Pressable } from "react-native";

export function BasicCard({showEditModal, data, deleteScene, navigateToScene }) {
  return (
    <XStack $sm={{ flexDirection: 'column' }} paddingHorizontal="$4" space>
      {data.map((value, index) => {
        return (
          <SceneCard
            key={index}
            data={value}
            showEditModal={showEditModal}
            deleteScene={deleteScene}
            navigateToScene={navigateToScene}
          />
        );
      })}
    </XStack>
  );
}

export function SceneCard({ showEditModal, data, deleteScene, navigateToScene }) {
  const editModal = () => {
    showEditModal(true);
  }

  const handleDelete = async (id) => {
    try {
      await deleteScene("scene", id);
      console.log('Scene deleted successfully');
    } catch (error) {
      console.error('Error deleting scene:', error);
    }
  };


  return (
  <Pressable onPress={() => navigateToScene(data.id)}>
    <Card elevate size="$4" 
          bordered={2}  
          borderColor={'white'}
          animation="bouncy"
          width={"100%"}
          height= {'auto'}
          scale={0.9}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
    >
      <Card.Header padded>
        <H3>{data.description}</H3>
        <H5>Budget: <H6>{data.budget}</H6></H5>
        <H5>Minutes: <H6>{data.minutes}</H6></H5>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Pressable
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            editModal();
          }}>
          <Image source={require('~/assets/edit.png')} style={{top:-10}}/>
        </Pressable>
        <Pressable
          style={{ marginHorizontal: 6 }}
          onPress={() => {
            handleDelete(data.id);
          }}>
          <Image source={require('~/assets/delete.png')} style={{top:-10}} />
        </Pressable>
      </Card.Footer>
      <Card.Background backgroundColor='black' borderRadius={5}>

      </Card.Background>
    </Card>
  </Pressable>
  );
}
