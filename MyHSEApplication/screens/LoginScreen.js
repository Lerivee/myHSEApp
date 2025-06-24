import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
    const [matriculationNumber, setMatriculationNumber] = useState('');
    const [password, setPassword] = useState('');
    const [hidepassword, setHidePassword] = useState(true);
    const [message, setMessage]= useState('');
    const [enteredMatricNumber, setEnteredMatricNumber] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const login = () => {
      if(!matriculationNumber || !password ){
        Alert.alert('Invalid Credentials.')
      }else{
        navigation.navigate('Dashboard');
      }
    }
    return (
        <View style={styles.container}>
        <Image
            source={require('./hseimm.jpg')}
            style={styles.image}
        />
      <Text style={styles.title}>LOGIN</Text>


      <View style={styles.inputContainer}>
        <Icon name="id-card" size={18} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={matriculationNumber}
          onChangeText={setMatriculationNumber}
          placeholder="matriculation number"
          placeholderTextColor="black"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <Icon size={20} color="gray" style={styles.eye}  name={hidepassword ? 'eye-slash' : 'eye'} onPress={() => setHidePassword(!hidepassword)} />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidepassword}
          placeholder="password"
          placeholderTextColor="black"
          isPassword={true}
          hidepassword={hidepassword}
          setHidePassword={setHidePassword}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={login}>
        <Text style={styles.signUpButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#17553E',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: 'fff',

  },
  image : {
    width:300,
    height: 220,
    position: 'relative',
    right:0,
    marginTop: 20,
    marginLeft: 10,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: -50,
    overflow: 'visible',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#17553E',
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingLeft: 40,
    fontSize: 16,
    width: 310,
    marginLeft: 10,
    height: 50,
    color: '#000',
  },
  icon: {
    position: 'absolute',
    left: 25,
    top: 14,
    width: 20,
    height: 20,
    zIndex: 1,
  },
  eye: {
    position: 'absolute',
    left: 279,
    top: 14,
    width: 20,
    height: 20,
    zIndex: 1,
  },
  placeholderText: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 5,
    fontWeight: '500',
    marginLeft:30,
  },
  signUpButton: {
    backgroundColor: '#17553E',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    width: 150,
    marginLeft: 90,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});