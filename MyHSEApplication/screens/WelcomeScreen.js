import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({navigation}) {
    const handleSignUp = () => {
        navigation.navigate('Register');
    };
    const handleSignIn = () => {
        navigation.navigate('Login');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.speech}>Welcome to</Text>
      <Text style={styles.title}>HSE Mobile App</Text>
      <Text style={styles.slogan}>Safe Minds, Healthy Lives, Sustainable Future</Text>
      <Image
        source={require('./hse.png')}
        style={styles.image}
        resizeMode="center"
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#17553E',
  },
  speech: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 70,
  },
  title: {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  slogan: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginLeft: 15,
    marginBottom: 290,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 90,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  button: {
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});