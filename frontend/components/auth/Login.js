import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await Auth.signIn(username, password);
      navigation.navigate('Home'); // Navegar a la pantalla principal
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iniciar Sesión</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  link: { color: 'blue', marginTop: 16, textAlign: 'center' },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});

export default Login;
