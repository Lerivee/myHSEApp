import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import HealthScreen from './screens/HealthScreen';
import SafetyScreen from './screens/SafetyScreen';
import EnvironmentScreen from './screens/EnvironmentScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Health" component={HealthScreen} />
            <Tab.Screen name="Safety" component={SafetyScreen} />
            <Tab.Screen name="Environment" component={EnvironmentScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen}  />
                <Stack.Screen name="Login" component={LoginScreen}  />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Health" component={HealthScreen} />
                <Stack.Screen name="Safety" component={SafetyScreen} />
                <Stack.Screen name="Environment" component={EnvironmentScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Main" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}