import React from 'react';
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider } from '@firebase/auth';



function login(id_token) {
  console.log('The token ', id_token)

  try {
    const credential = GoogleAuthProvider.credential(id_token);

    return credential;
  } catch (error) {
    console.log(error)
  }
}
export default async function useGoogleSignIn() {

  try {
    const result = await Google.logInAsync({
      androidClientId: "355903971926-1vd5idfngdbnf9sr2n24mvh4n8vdd9q4.apps.googleusercontent.com",
      iosClientId: "355903971926-cit4fe4cjeunq45f8u9u2c3pb5cu8hbd.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      const { idToken, accessToken, user } = result

      const credential = await login(idToken)

      return [credential];

    } else {
      console.log("Permission denied");
    }
  } catch (e) {
    console.log(e);
    return e.message
  }


}