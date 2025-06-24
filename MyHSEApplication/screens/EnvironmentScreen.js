import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';



export default function EnvironmentScreen() {
    const [category, setCategory] = useState('Littering and Waste Management');
    const [report, setReport] = useState('');
    const [reportsList, setReportsList] = useState([]);
    const [showUploadOptions, setShowUploadOptions] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const navigation = useNavigation();
    const [reportTitle, setReportTitle] = React.useState('');
    const [mediaUri, setMediaUri] = React.useState('');
    const [mediaType, setMediaType] = React.useState('');

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const requestMediaLibraryPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access media library is required!');
        }
    };

    useEffect(() => {
        requestMediaLibraryPermissions();
        fetchHealthData();
    }, []);


    const fetchEnvironmentData = async () => {
        try {
            const { data } = await axios.get('http://10.0.2.2:3000/api/environment/recent');
            setEnvironmentReports(data.reports);
            setEnvironmentNotifications(data.notifications);
        } catch (error) {
            Alert.alert('Failed to load environment data');
        }
    };

    const submitReport = async () => {
        const formData = new FormData();
        formData.append('file', {
            uri: mediaUri,
            type: mediaType,
            name: `report-media.${mediaType.split('/')[1]}`,
        });
        formData.append('title', reportTitle);
        formData.append('content', reportContent);

        try {
            await axios.post('http://10.0.2.2:3000/api/environment/report', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', 'Environmental issue reported successfully');

            setReportTitle('');
            setReportContent('');
            setMediaUri('');
            setMediaType('');
            fetchEnvironmentData();
        } catch (error) {
            Alert.alert('Error', 'Failed to submit the report');
        }
    };

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUploadedFiles([...uploadedFiles, result.assets[0]]);
        }
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setCategoryModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Environment</Text>

            <View style={styles.environmentContainer}>
            <Text style={styles.headerText}>Environment Notifications</Text>

            <FlatList
                data={reportsList}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.reportItem}>
                        <Text>{item.description}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No notifications yet</Text>}
                />
                <Text style={styles.headerText}>Environment Reports</Text>

                <FlatList
                    data={reportsList}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.reportItem}>
                            <Text>{item.description}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>No reports submitted yet</Text>}
                />

                <View style={styles.reportSection}>
                    <Text style={styles.reportTitle}>Report Environmental Issues</Text>

                    <TouchableOpacity
                        onPress={() => setCategoryModalVisible(true)}
                        style={styles.categoryButton}
                    >
                        <Text style={styles.categoryButtonText}>Category: {category}<Ionicons name="chevron-down-outline" size={25} color="white" style={styles.dropdown}/> </Text>
                    </TouchableOpacity>

                    <Modal
                        visible={categoryModalVisible}
                        transparent={true}
                        animationType="fade"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Select Category</Text>
                                <TouchableOpacity onPress={() => handleCategorySelect('Littering and Waste Management')}>
                                    <Text style={styles.modalItem}>Littering and Waste Management</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleCategorySelect('Water Leaks')}>
                                    <Text style={styles.modalItem}>Water Leaks</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleCategorySelect('Energy Wastage')}>
                                    <Text style={styles.modalItem}>Energy Wastage</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleCategorySelect('Electrical Hazards')}>
                                    <Text style={styles.modalItem}>Electrical Hazards</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleCategorySelect('Other Environmental Concerns')}>
                                    <Text style={styles.modalItem}>Other Environmental Concerns</Text>
                                </TouchableOpacity>
                                <Button title="Close" onPress={() => setCategoryModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>

                    <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={reportTitle}
                    onChangeText={setReportTitle}
                    />

                    <TextInput
                        style={styles.textInput}
                        value={report}
                        onChangeText={setReport}
                        placeholder="Describe the issue"
                    />
                    <TouchableOpacity onPress={toggleModal} style={styles.plusButton}>
                        <Text style={styles.plusText}>+</Text>
                    </TouchableOpacity>
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
                        <TouchableOpacity style={styles.modalOption} onPress={handleImagePick}>
                            <Text>Upload Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={handleImagePick}>
                            <Text>Upload Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={handleImagePick}>
                            <Text>Upload Document</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption}>
                            <Text>Add Location</Text>
                        </TouchableOpacity>
                        <Button title="Close" onPress={toggleModal} />
                    </View>
                </Modal>

                    <Button title="Submit" onPress={submitReport} style={styles.submit}/>
                </View>
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
        top: 40,
        left: 20,
    },
    backArrow: {
        fontSize: 24,
        color: 'black',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        color: 'black',
    },
    environmentContainer: {
        backgroundColor: '#17553E',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        flex: 1,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reportSection: {
        marginBottom: 20,
        marginTop: 20,
        top: 20,
    },
    reportTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        bottom: 60,
    },
    categoryButton: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        bottom: 60,
        left: 7,
    },
    categoryButtonText: {
        color: 'white',
        fontSize: 17,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        fontSize: 16,
        padding: 10,
        marginBottom: 5,
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        bottom: 60,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        bottom: 60,
    },
    plusButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,

    },
    plusText: {
        fontSize: 24,
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalOption: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    reportItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    emptyText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
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
    dropdown: {
        top: 50,
        left: 130,
    },
});
