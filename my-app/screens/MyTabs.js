import { StyleSheet, Text, View } from 'react-native';
import React, {useContext} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ProfileScreen from '../components/ProfileScreen';
import FeedScreen from "../components/FeedScreen"
import CreatePostScreen from "../components/CreatePost"
import FevScreen from "../components/FevScreen"
import SearchScreen from '../components/SearchScreen';
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from '../firebase-config';
import { Avatar } from 'react-native-paper';
import FeedTwo from '../components/FeedTwo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CredentialsContext} from '../components/CredentialsContext'

const Tab = createMaterialBottomTabNavigator();
export default function MyTabs() {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
const {userName, email, lastSeen, profilePic, uid, uniName}= storedCredentials
   //r const user = useAuthUser(["user"], auth);
    return (
        <Tab.Navigator
            screenOptions={{
                labeled: false
            }}
            shifting={false}
            initialRouteName="Feed"
            activeColor="#f35d38"
            inactiveColor="#D1D3D2"


            barStyle={{
                backgroundColor: '#FBFCFE', borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}
        >
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="search"
                component={SearchScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="search" color={color} size={24} />
                    ),
                }}
            />

            <Tab.Screen
                name="upload"
                component={CreatePostScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Feather name="plus-square" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="fev"
                component={FevScreen}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="hearto" color={color} size={24} />
                    ),
                }}
            />
                      <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{userId: uid, username: userName}}
                options={{
                    tabBarLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Avatar.Image size={26} source={{uri: `${profilePic}`}}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});

//<Avatar.Image size={26} source={{uri: `${user.data.photoURL}`}}/>
