import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Button } from 'react-native';
import axios from 'axios';

const CharacterEditModal = ({ closeEditModal }) => {
  const [formData, setFormData] = useState({
    description: '',
    cost: '',
    stock: ''
  });

  const handleChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://192.168.18.94:8081/character', formData);
      console.log('Character saved:', response.data);
      closeEditModal();
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingrese los datos del personaje:</Text>
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={formData.description}
              onChangeText={text => handleChange('description', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Costo"
              value={formData.cost}
              onChangeText={text => handleChange('cost', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Stock"
              value={formData.stock}
              onChangeText={text => handleChange('stock', text)}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <Button title="Guardar" onPress={handleSave} color="silver" />
              <View style={styles.buttonSpacer} />
              <Button title="Cerrar" onPress={closeEditModal} color="black" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonSpacer: {
    width: 10,
  },
});

export default CharacterEditModal;
