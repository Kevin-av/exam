import React from "react";
import { Stack, Link } from 'expo-router';
import { Image, YStack } from "tamagui";

import { Container, Main, Title, Button, ButtonText } from '../tamagui.config';

export default function Page() {
  return (
    <Container 
      style={{backgroundColor: 'black', 
              textAlign: 'center', 
              justifyContent:'center', 
              fontStyle:'Inter' }}>
      <Main justifyContent='center' alignItems='center'>
        <Stack.Screen options={{ title: 'Tercer Momento'}} />
        <Image
          source={
            require('../assets/icon.png')}
          style={{top: -70, 
            width: 300, 
            height: 100, 
            alignSelf: 'center' }}
        />
        <YStack>
          <Title 
            style={{color: 'white', 
                    fontSize: 30, 
                    fontWeight: 'bold'}}>
                Movie Making 
          </Title>
        </YStack>
        <Link 
          href={{ 
            pathname: '/details', 
            params: { name: 'Dan' } }} 
          asChild>
          <Button backgroundColor='silver' 
                  style={{height: 55,
                          width: 125}}>
            <ButtonText>Comenzar</ButtonText>
          </Button>
        </Link>
      </Main>
    </Container>
  );
}
