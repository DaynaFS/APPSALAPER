//import React from 'react';
//import { Text } from 'react-native';
//global.Buffer = global.Buffer || require('buffer').Buffer;
//global.process = require('process');


import React, { useRef, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { listTodos } from '../src/graphql/queries';
import { onCreateTodo } from '../src/graphql/subscriptions';
import 'react-native-get-random-values';
//import * as queries from '../src/graphql/queries';

import AuthScreen from '../AuthScreen';
import fetchSSNData from '../backend/services/ssnFetchData'; // Importar fetchSSNData

try {
Amplify.configure(awsconfig);
} catch (error){
  console.error('Error al configurar Amplify:', error);
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]); // Estado para guardar los datos de sismos
  const mapRef = useRef(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      setTodos(todoData.data.listTodos.items);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  // Llama a fetchSSNData y guarda los datos en el estado earthquakes
  const fetchEarthquakes = async () => {
    try {
      const data = await fetchSSNData();
      setEarthquakes(data);
    } catch (error) {
      console.error('Error al obtener datos de sismos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchEarthquakes(); // Llama a la función para obtener sismos
  }, []);

  // Configurar la suscripción para escuchar nuevos Todos en tiempo real
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

      {/* Muestra los datos de Todos */}
      <View>
        {todos.map((todo, index) => (
          <Text key={index}>{todo.name}</Text>
        ))}
      </View>

      {/* Muestra los datos de sismos */}
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
