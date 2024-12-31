import React, { useRef, useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import 'react-native-reanimated';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { listTodos } from './src/graphql/queries';
import { onCreateTodo } from './src/graphql/subscriptions';
import { createItemDB } from './backend/services/apiserv';
import AuthScreen from './AuthScreen';
import fetchSSNData from './backend/services/ssnFetchData';
import { TailwindProvider } from 'nativewind';




// Configurar Amplify
try {
  Amplify.configure({
    ...awsconfig,
    storage: AsyncStorage,
  });
  console.log('Amplify configurado correctamente');
} catch (error) {
  console.error('Error al configurar Amplify:', error.message);
}


const sendNotification = async () => {
  const notificationData = {
    target: 'dayyfloressz.24@gmail.com',
    message: {
      title: 'Nueva Notificación',
      body: 'SISMO EN CAMINO',
    },
  };

  try {
    const response = await fetch('http://localhost:3000/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error('Error al enviar la notificación');
    }

    const result = await response.json();
    Alert.alert('Notificación Enviada', JSON.stringify(result));
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);
  const mapRef = useRef(null);

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
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
      municipio: 'Coyoacan',
      magnitud: '4. grados',
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
      <Button title="Enviar Notificación" onPress={sendNotification} />
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
