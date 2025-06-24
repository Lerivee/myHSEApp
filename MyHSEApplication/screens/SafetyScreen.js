import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function SafetyScreen() {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();

    const fetchSafetyNotifications = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const { data } = await axios.get('http://10.0.2.2:3000/api/safety/notifications', {
                headers: {
                    'Authorization': token,
                },
            });
            setSafetyNotifications(data);
        } catch (error) {
            Alert.alert('Failed to load safety notifications');
        }
    };

    React.useEffect(() => {
        fetchSafetyNotifications();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Safety</Text>
            <View style={styles.safetyContainer}>
                <Text style={styles.safetyTitle}>Safety Notes!!!</Text>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.notificationItem}>
                            <Text>{item.description}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Ionicons name="home" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Health')}>
                    <FontAwesome5 name="heartbeat" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Safety')}>
                    <FontAwesome5 name="shield-alt" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Environment')}>
                    <FontAwesome5 name="globe" size={25} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    backButton: {
        position: 'absolute',
        top: 46,
        left: 18,
    },
    backArrow: {
        fontSize: 35,
        color: 'black',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 50,
        color: 'black',
        left: 45,
    },
    safetyContainer: {
        backgroundColor: '#17553E',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        left: 15,
        width: 340,
    },
    safetyTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    notificationItem: {
        marginBottom: 10,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#013220',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        left: 0,
    },
});