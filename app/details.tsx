import { Feather } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import { Button, Text, YStack } from 'tamagui';

import { Container, Main, Subtitle, Title } from '../tamagui.config';
import { CardDemo } from "~/app/components/BasicCard";
import EditModal from "~/app/components/EditModal";

export default function Details() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const [showEditModal, setShowEditModal]=useState(false);

  const openEditModal=()=>{
    setShowEditModal(true)
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
      <Stack.Screen options={{ headerTitleStyle:{color: 'white'},
                               headerStyle:{backgroundColor: 'white'}, 
                               title: '', headerLeft: () => <BackButton /> }} />
      <Main>
        <YStack>
          <Text color='white' fontWeight="bold" fontSize={40}>Panel</Text>
          <CardDemo setShowEditModal={openEditModal}></CardDemo>
        </YStack>
      </Main>
      {showEditModal&&
        <EditModal></EditModal>
      }
    </Container>
  );
}
