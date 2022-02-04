import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { CredentialsContext } from './CredentialsContext';
import React, { useContext } from 'react';


export default function ProfileMiddle({ userId, username, userProfilePic }) {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const { userName, email, lastSeen, profilePic, uid, uniName } = storedCredentials

    const isTrue = userId === uid
    return (
        <View style={styles.conte}>
            <View style={styles.wrapper}>
                <View>
                    {isTrue ? (
                        <Image source={{ uri: `${profilePic}` }} style={styles.zimage} />
                    ) : (<Image source={{ uri: `${userProfilePic}` }} style={styles.zimage} />)}

                </View>

                <View style={styles.leftWrapper}>

                    <Text style={{ fontSize: 18 }}> {username} </Text>
                    <View style={{ marginTop: 5, alignItems: "center" }}>
                        {isTrue ? (
                            <TouchableOpacity>
                                <Text style={{ fontWeight: "bold", fontSize: 14 }}>edit profile</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity>

                                <Text>follow</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    leftWrapper: {

        marginLeft: 15

    },
    conte: {
        marginTop: 20
    },
    zimage: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2

    },

    wrapper: {
        marginHorizontal: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    }
});
