import { StyleSheet, ActivityIndicator, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, signInWithCredential, getAuth } from '@firebase/auth';
import {CredentialsContext} from "../components/CredentialsContext"

import { auth } from '../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)


    const handleStore = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('user', jsonValue)
            setStoredCredentials(value)
            navigation.navigate("Tabs")


        } catch (error) {
            console.log(error)
        }
    }
    const handleSignIn = () => {
        navigation.navigate("Tabs")
    }

    async function signin() {
        setLoading(true)
        const config = {
            androidClientId: "355903971926-1vd5idfngdbnf9sr2n24mvh4n8vdd9q4.apps.googleusercontent.com",
            iosClientId: "355903971926-cit4fe4cjeunq45f8u9u2c3pb5cu8hbd.apps.googleusercontent.com",
            scopes: ["profile", "email"]
        }
        try {
            const result = await Google.logInAsync(config)

            if (result.type === "success") {
                const { idToken, accessToken, user } = result;
                console.log(user)
                const credential = await GoogleAuthProvider.credential(idToken)
                const authUser = await signInWithCredential(auth, credential)
                if (authUser) {
                    console.log(authUser.user)
                    const { user } = authUser
                    const data = {
                        userName: user.displayName,
                        email: user.email,
                        lastSeen: user.lastLoginAt,
                        profilePic: user.photoURL,
                        uid: user.uid,
                        uniName: `@${user.email.split("@")[0]}`
                    }
                    handleStore(data)
                }
            } else {
                console.log("Permission denied");
            }

        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }



//     useEffect(() => {
//         if (user.data) {
//             navigation.navigate("Tabs")
//         }
//     }, [])

//     if (user.isLoading) {
//         return (
//             <View style={styles.container}>
//                 <Text>Loading....</Text>
//             </View>
//         )
//     }


    return (
        <View style={styles.container} >
            {!loading ? (
                <>
                    <Image style={{ width: 60, height: 60, marginVertical: 20 }} source={{ uri: "https://i.imgur.com/UFpDWQn.png" }} />
                    <TouchableOpacity onPress={signin} style={[styles.button, { backgroundColor: '#54b72b' }]}>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Image style={{ width: 60, height: 60, marginVertical: 20 }} source={{ uri: "https://i.imgur.com/UFpDWQn.png" }} />
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#54b72b' }]}>
                        <ActivityIndicator size="large" color="white" />
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
