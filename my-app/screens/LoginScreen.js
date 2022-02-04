import { StyleSheet, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
//import useGoogleSignIn from '../hooks/useGoogleSignIn';

const LoginScreen = () => {

    const [loading, setLoading] = useState(false)
/*
    async function signWithgoogle() {
        setLoading(true)
        try {
            const [credential] = await authWithGoogle()
            //await login(credential);
            console.log(credential)

            setLoading(false)

        } catch (error) {
            console.log(error)


        }
    }
    */
    return (
        <View>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

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
    }
});
