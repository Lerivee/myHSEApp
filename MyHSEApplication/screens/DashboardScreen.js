import React, {useState, useEffect} from 'react';
import { View, Text, Button, Image, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function DashboardScreen({ route }) {
    const navigation = useNavigation();
    const { userName } = route?.params || { userName: 'Guest' };
    const [recentActivities, setRecentActivities] = React.useState([]);
    const [profileImage, setProfileImage] = React.useState('https://i.pinimg.com/236x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg');
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [image, setImage] = useState(null);

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {

        const fetchDashboardData = async () => {
            const token = AsyncStorage.getItem('authToken');

            if (token) {
                axios.get('http://10.0.2.2:3000/auth/api/dashboard', {
                    headers: {
                        'Authorization': token,
                    }
                }).then(response => {
                    console.log('Dashboard data:', response.data);
                }).catch(error => {
                    console.error('Failed to fetch dashboard data:', error);
                });
            } else {
                console.error('No token found in localStorage');
            }
        };

        fetchDashboardData();
    }, []);


    const handleLogout = () => {
        AsyncStorage.removeItem('authToken');
        Alert.alert('Logged out', 'You have been logged out.', [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi, {userName}</Text>
                <TouchableOpacity onPress={pickImage}>
                    {image && <Image source={{ uri: image }}  />}
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                </TouchableOpacity>
            </View>

            <View style={styles.navIcon}>
                <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                    <FontAwesome5 name="bars" size={25} color="black" />
                </TouchableOpacity>
                {menuVisible && (
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Text style={styles.navButton}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.navButton}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Text style={styles.title}>Dashboard</Text>

            <View style={styles.activityContainer}>
                <Text style={styles.sectionTitle}>Recent Activities</Text>
                <ScrollView>
                    <Text style={styles.subsectionTitle}>Reports</Text>
                    <View style={styles.reportsContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Health')}>
                            <Text style={styles.reportItems}>Health Reports</Text>
                            <Text style={styles.reportItem}>I had a headache and was administered

    Paracetamol by Nurse Amarachi...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Environment')}>
                            <Text style={styles.reportItems}>Environment Reports</Text>
                            <Text style={styles.reportItem}>In Room 102B CICL, there is a
                                leaking toilet which smells...</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Notifications Section */}
                    <Text style={styles.subsectionTitle}>Notifications</Text>
                    <View style={styles.notificationsContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Health')}>
                            <Text style={styles.notificationItem}>Health Notifications</Text>
                            <Text style={styles.reportItem}>Your hygiene is so important so mind

    the way you touch ...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Safety')}>
                            <Text style={styles.notificationItem}>Safety Notifications</Text>
                            <Text style={styles.reportItem}>Make sure to turn off all electrical

    appliances before leaving....</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Environment')}>
                            <Text style={styles.notificationItem}>Environment Notifications</Text>
                            <Text style={styles.reportItem}>Don't throw trash on the ground, make

    sure to pick up...</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.tabBar}>
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

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginLeft: 30,
    },
    profileImage: {
        width: 53,
        height: 53,
        borderRadius: 25,
    },
    greeting: {
        fontSize: 23,
    },
    navIcon: {
        position: 'absolute',
        top: 35,
        left: 20,
    },
    menu: {
        marginTop: 10,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    navButton: {
        fontSize: 19,
        color: 'white',
        paddingVertical: 5,
    },
    title: {
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    activityContainer: {
        backgroundColor: '#316853',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        marginLeft: 70,
    },
    subsectionTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    reportsContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    reportItems: {
        fontSize: 18,
        color: '#333',
        paddingVertical: 5,
        textDecorationLine: 'underline',
    },
    reportItem: {
        fontSize: 15,
        color: '#333',
        paddingVertical: 5,
    },
    notificationsContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    notificationItem: {
        fontSize: 18,
        color: '#333',
        paddingVertical: 5,
        textDecorationLine: 'underline',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#013220',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});
