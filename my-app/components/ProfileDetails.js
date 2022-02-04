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
import useGetuserDetail from '../hooks/useGetuserDetail';

export default function ProfileDetails({ userId, username }) {
    const { feeds, follow, following } = useGetuserDetail(userId)

    return (
        <View style={styles.conte}>
            <View style={styles.wrapper}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {feeds.length}
                    </Text>
                    <Text>posts</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{follow.length}</Text>
                        <Text>followers</Text>
                    </TouchableOpacity>
                </View>
                <View>

                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{following.length} </Text>
                        <Text>following</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conte: {
        marginTop: 25
    },
    wrapper: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    }
});
