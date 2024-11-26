import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const EvacuationModal = ({ visible, onClose, point, onNavigate }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{point?.title}</Text>
        <Text style={styles.modalDescription}>{point?.protocol}</Text>
        <Button title="Ir al punto de evacuación" onPress={() => onNavigate(point)} />
        <Button title="Cerrar" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalDescription: { fontSize: 16, marginBottom: 15 },
});

export default EvacuationModal;
