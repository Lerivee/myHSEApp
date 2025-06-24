import React from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Modal } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';


export default function HealthScreen() {
    const navigation = useNavigation();
    const [healthReports, setHealthReports] = React.useState([]);
    const [healthNotifications, setHealthNotifications] = React.useState([]);
    const [reportTitle, setReportTitle] = React.useState('');
    const [reportContent, setReportContent] = React.useState('');
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [mediaUri, setMediaUri] = React.useState('');
    const [mediaType, setMediaType] = React.useState('');

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };


    const fetchHealthData = async () => {
        try {
            const { data } = await axios.get('http://10.0.2.2:3000/api/health/recent');
            setHealthReports(data.reports);
            setHealthNotifications(data.notifications);
        } catch (error) {
            Alert.alert('Failed to load health data');
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', {
            uri: mediaUri,
            type: mediaType,
            name: `report-media.${mediaType.split('/')[1]}`,
        });
        formData.append('title', reportTitle);
        formData.append('content', reportContent);

        try {
            await axios.post('http://10.0.2.2:3000/api/health/report', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', 'Health issue reported successfully');
            setReportTitle('');
            setReportContent('');
            setMediaUri('');
            setMediaType('');
            fetchHealthData();
        } catch (error) {
            Alert.alert('Error', 'Failed to submit the report');
        }
    };

    const handleMediaPick = (type) => {
        const options = {
            mediaType: type,
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setMediaUri(response.uri);
                setMediaType(response.type);
                console.log('Media selected: ', response.uri);
            }
        });
    };


    React.useEffect(() => {
        fetchHealthData();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Ionicons name="arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Health</Text>
            </View>
            <TouchableOpacity style={styles.plusButton} onPress={toggleModal}>
                <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>


            <View style={styles.reportContainer}>
                <Text style={styles.reportTitle}>Report Health Issue</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={reportTitle}
                    onChangeText={setReportTitle}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Describe the issue..."
                    value={reportContent}
                    onChangeText={setReportContent}
                    multiline
                />
                {mediaUri ? (
                    mediaType.startsWith('image/') ? (
                        <Image source={{ uri: mediaUri }} style={styles.imagePreview} />
                    ) : (
                        <Text style={styles.filePreview}>Selected File: {mediaUri.split('/').pop()}</Text>
                    )
                ) : null}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalOption} onPress={() => handleMediaPick('photo')}>
                        <Text>Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={() => handleMediaPick('video')}>
                        <Text>Upload Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={() => handleMediaPick('document')}>
                        <Text>Upload File</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption}>
                        <Text>Add Location</Text>
                    </TouchableOpacity>
                    <Button title="Close" onPress={toggleModal} />
                </View>
                </Modal>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

            </View>
            <ScrollView>
                <Text style={styles.sectionTitle}>Recent Health Reports</Text>
                <FlatList
                    data={healthReports}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDescription}>{item.content}</Text>
                            <Button title="View Report" onPress={() => navigation.navigate('HealthReport', { reportId: item.id })} />
                        </View>
                    )}
                />

                <Text style={styles.sectionTitle}>Health Notifications</Text>
                <FlatList
                    data={healthNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemTitle}>{item.message}</Text>
                            <Button title="View Notification" onPress={() => navigation.navigate('HealthNotification', { notificationId: item.id })} />
                        </View>
                    )}
                />
            </ScrollView>

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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        top: 40,
    },
    backArrow: {
        fontSize: 24,
        marginRight: 10,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    reportContainer: {
        backgroundColor: '#17553E',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        top: 40,
        width: 340,
        left: 15,
    },
    reportTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#015885',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 85,
        left: 220,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    sectionTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        marginVertical: 10,
        top: 70,
        left: 15,
    },
    item: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    itemTitle: {
        fontWeight: 'bold',
    },
    itemDescription: {
        marginBottom: 5,
        height: 50,
    },
    plusButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 90,
        padding: 1,
        position: 'absolute',
        left: 40,
        top: 280,
        zIndex: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',

    },
    plusButtonText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        left: 7,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderColor: '#000',
        padding: 20,
        width: 150,
        borderRadius: 10,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: 150,
    },
    modalOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    tabBar: {
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
