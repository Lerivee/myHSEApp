import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { registerUser } from '../hse-backend/api';


export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [matriculationNumber, setMatriculationNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidepassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleRegister = async () => {
      console.log('Register button pressed');
      if (!name || !matriculationNumber || !password ||!confirmPassword) {
        Alert.alert('Kindly fill in all fields.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Login');
      }, 2000);

      const userData = {
        name,
        matriculationNumber,
        password,
        confirmPassword,
      };



      try {
        const response = await fetch('http://10.0.2.2:3000/auth/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
          //timeout: 10000,
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Success', data.msg);
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', data.msg);
        }

      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>REGISTER</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Fullname"
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="id-card" size={18} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={matriculationNumber}
            onChangeText={setMatriculationNumber}
            placeholder="Matriculation number"
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
            placeholder="Password"
            placeholderTextColor="black"
            isPassword={true}
            hidepassword={hidepassword}
            setHidePassword={setHidePassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="gray" style={styles.icon} />
          <Icon size={20} color="gray" style={styles.eye}  name={hideConfirmPassword ? 'eye-slash' : 'eye'} onPress={() => setHideConfirmPassword(!hideConfirmPassword)} />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry= {hideConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="black"
            isPassword={true}
            hideConfirmPassword={hideConfirmPassword}
            setHideConfirmPassword={setHideConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
          <Text style={styles.signUpButtonText}>REGISTER </Text>
          {loading && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Already have an account? LOGIN</Text>
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
        marginBottom: 30,
      },
      inputContainer: {
        marginBottom: 20,
        backgroundColor: '000',
      },
      input: {
        borderColor: '#17553E',
        borderWidth: 2,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
        paddingLeft: 40,
        fontSize: 16,
        color: 'black',
        width: 310,
        marginLeft: 10,
        height: 50,
      },
      placeholderText: {
        fontSize: 1,
        color: '#000',
        marginBottom: 5,
        fontWeight: '500',
        marginLeft:30,
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
      signUpButton: {
        backgroundColor: '#17553E',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        width: 150,
        marginLeft: 85,
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