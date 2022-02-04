import { StyleSheet, Text, View } from 'react-native';
import React, {useContext} from 'react';
import MyTabs from './MyTabs';
import Login from './Login';

import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase-config';
import {CredentialsContext} from "../components/CredentialsContext"

const Stack = createNativeStackNavigator();
export default function RootNavigation() {
 
    
    return (
        <CredentialsContext.Consumer>
        {({storedCredentials})=> (
    <NavigationContainer>
            <Stack.Navigator >
                {storedCredentials ? (
                    <>

                        <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} />

                )}

            </Stack.Navigator>
        </NavigationContainer>
    
    )}
        </CredentialsContext.Consumer>
        
    );
}

const styles = StyleSheet.create({});
