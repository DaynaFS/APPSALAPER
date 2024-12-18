// frontend/components/auth/EmailVerification.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

const EmailVerification = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, verificationCode);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error verificando correo', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Código de Verificación"
        value={verificationCode}
        onChangeText={setVerificationCode}
        style={styles.input}
      />
      <Button title="Verificar Correo" onPress={confirmSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
});

export default EmailVerification;
