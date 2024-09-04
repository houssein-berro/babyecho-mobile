// components/CustomModal.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Button from '../button/button'; // Assuming Button is a custom component

const CustomModal = ({ isVisible, onClose, onAddBaby }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>No Baby Found</Text>
        <Text style={styles.modalMessage}>
          Please add a baby before you can start recording.
        </Text>
        <Button
          title="Add Baby"
          onPress={() => {
            onClose();
            onAddBaby();
          }}
        />
        <Button
          title="Cancel"
          onPress={onClose}
          style={styles.modalCancelButton}
          outlined={true}
        />
      </View>
    </Modal>
  );
};


});

export default CustomModal;
