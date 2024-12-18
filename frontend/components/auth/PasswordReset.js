// frontend/components/auth/PasswordReset.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

const PasswordReset = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [stage, setStage] = useState('request'); // 'request' or 'reset'

  const requestPasswordReset = async () => {
    try {
      await Auth.forgotPassword(username);
      setStage('reset');
    } catch (error) {
      console.error('Error solicitando recuperación de contraseña', error);
    }
  };

  const resetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error restableciendo la contraseña', error);
    }
  };

  return (
    <View style={styles.container}>
      {stage === 'request' ? (
        <>
          <TextInput
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <Button title="Solicitar Restablecimiento" onPress={requestPasswordReset} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Código de Verificación"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.input}
          />
          <TextInput
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Restablecer Contraseña" onPress={resetPassword} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
});

export default PasswordReset;
