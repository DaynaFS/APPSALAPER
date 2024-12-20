import React, { useRef, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { listTodos } from '../src/graphql/queries';
import { onCreateTodo } from '../src/graphql/subscriptions';
import { createItemDB } from '../backend/services/apiserv';
import AuthScreen from '../AuthScreen';
import fetchSSNData from '../backend/services/ssnFetchData';

// Configurar Amplify
try {
  Amplify.configure(awsconfig);
} catch (error) {
  console.error('Error al configurar Amplify:', error.message);
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);
  const mapRef = useRef(null);

  // Verificar autenticación
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Obtener lista de TODOs
  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      setTodos(todoData.data.listTodos.items);
    } catch (error) {
      console.error('Error al obtener TODOS:', error.message);
    }
  };

  // Obtener datos de sismos del SSN
  const fetchEarthquakes = async () => {
    try {
      const data = await fetchSSNData();
      setEarthquakes(data);
    } catch (error) {
      console.error('Error al obtener datos de sismos:', error.message);
    }
  };

  // Suscripción en tiempo real
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const newTodo = eventData.value.data.onCreateTodo;
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        console.log('Nuevo TODO en tiempo real:', newTodo);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cargar TODOS y datos de sismos al iniciar
  useEffect(() => {
    fetchTodos();
    fetchEarthquakes();
  }, []);

  const handleCreateItem = async () => {
    const newItem = {
      id: Date.now().toString(),
      municipio: 'Tlalpan',
      magnitud: '5.0 grados',
    };

    try {
      const response = await createItemDB(newItem);
      Alert.alert('Elemento creado', JSON.stringify(response));
    } catch (error) {
      Alert.alert('Error al crear elemento', error.message);
    }
  };

  // Evitar mostrar la pantalla principal si no está autenticado
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const evacuationPoints = [
    { latitude: 19.35550, longitude: -99.15470, title: 'Punto de Evacuación 1' },
    { latitude: 19.35500, longitude: -99.15500, title: 'Punto de Evacuación 2' },
    { latitude: 19.35600, longitude: -99.15450, title: 'Punto de Evacuación 3' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 19.35529,
          longitude: -99.15486,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        {evacuationPoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title}
          />
        ))}
      </MapView>

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.header}>Datos de Sismos</Text>
        {earthquakes.map((quake, index) => (
          <View key={index} style={styles.card}>
            <Text>Título: {quake.title}</Text>
            <Text>Fecha: {quake.date}</Text>
            <Text>Descripción: {quake.description}</Text>
          </View>
        ))}
      </ScrollView>

      <Button title="Crear Elemento" onPress={handleCreateItem} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '40%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
});
