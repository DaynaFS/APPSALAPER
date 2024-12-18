import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }, // Puedes agregar más atributos como teléfono
      });
      setSuccess('Registro exitoso. Revisa tu correo para verificar la cuenta.');
      setTimeout(() => navigation.navigate('Login'), 2000); // Redirigir al login después de 2 segundos
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrar</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
  success: { color: 'green', marginBottom: 12, textAlign: 'center' },
});

export default Register;
