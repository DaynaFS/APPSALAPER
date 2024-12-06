// Importaciones necesarias
import React, { useRef, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { listTodos } from '../src/graphql/queries';
import { onCreateTodo } from '../src/graphql/subscriptions';
import { Location } from './frontend/components/Location';
import { createItemDB } from '../backend/services/apiService'; // Importar servicio para API
import AuthScreen from '../AuthScreen';
import fetchSSNData from '../backend/services/ssnFetchData'; // Importar fetchSSNData

// Configurar Amplify
try {
  Amplify.configure(awsconfig);
} catch (error) {
  console.error('Error al configurar Amplify:', error);
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]); // Estado para guardar los datos de sismos
  const mapRef = useRef(null);

  // Verificar autenticación del usuario
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Obtener datos de todos desde GraphQL
  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      setTodos(todoData.data.listTodos.items);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  // Obtener datos de sismos
  const fetchEarthquakes = async () => {
    try {
      const data = await fetchSSNData();
      setEarthquakes(data);
    } catch (error) {
      console.error('Error al obtener datos de sismos:', error);
    }
  };

  // Configurar suscripción para nuevos Todos en tiempo real
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const newTodo = eventData.value.data.onCreateTodo;
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        console.log('Nuevo Todo en tiempo real:', newTodo);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  // Llamar a las funciones fetch al cargar la app
  useEffect(() => {
    fetchTodos();
    fetchEarthquakes();
  }, []);

  // Crear un elemento en la base de datos mediante API
  const handleCreateItem = async () => {
    const newItem = {
      id: '456', // ID único para el nuevo ítem
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

  // Renderizar pantalla de autenticación si el usuario no está autenticado
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 19.35529,
          longitude: -99.15486,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        scrollEnabled={false}
      >
        <Marker coordinate={{ latitude: 19.35529, longitude: -99.15486 }} />
      </MapView>
      <Text>ESIME Culhuacán</Text>

      {/* Botón para crear un elemento */}
      <Button title="Crear Elemento" onPress={handleCreateItem} />

      {/* Mostrar datos de Todos */}
      <View>
        {todos.map((todo, index) => (
          <Text key={index}>{todo.name}</Text>
        ))}
      </View>

      {/* Mostrar datos de sismos */}
      <View>
        {earthquakes.map((quake, index) => (
          <Text key={index}>{quake.title} - {quake.date}</Text>
        ))}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
