import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Image, ActivityIndicator, StatusBar, TouchableOpacity, View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { db } from '../firebase-config';
import {
    query,
    collection,
    limit,
    orderBy,
    startAfter,
    getDocs,
    onSnapshot
} from "firebase/firestore";

const BASE_URI = 'https://source.unsplash.com/random?sig=';


const feedsCollection = collection(db, "feeds");
export default function FeedTwo() {
    const [data, setDate] = useState([]);
    const [zdata, setZData] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchMore();
    }, []);
    const fetchMore = () => {
        setDate(prevState => [
            ...prevState,
            ...Array.from({ length: 20 }).map((_, i) => i + 1 + prevState.length),
        ]);
    };



    useEffect(() => {
        const q = query(feedsCollection, orderBy("timestamp", "desc"), limit(3));
        const unsubscribe = onSnapshot(q, (querySnap) => {
            const thefeeds = []


            querySnap.forEach(doc => {
                thefeeds.push({
                    ...doc.data(),
                    key: doc.id
                })
            })
            setZData(thefeeds)
            setLoading(false)
        })

      

        return () => unsubscribe()
    }, []);

    const updateState = (colls) => {
        const isCollEmpety = colls.size === 0;
        if (!isCollEmpety) {
            const items = colls.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data()
                };
            });
            const lsdoc = colls.docs[colls.docs.length - 1];

            setZData((zdata) => [...zdata, items]);
            setLastDoc(lsdoc);
        }
    };

    const fetchMoreD = (colls) => {
        const q = query(
            feedsCollection,
            orderBy("timestamp", "desc"),
            startAfter(lastDoc),
            limit(3)
        );
        getDocs(q).then((dts) => {
            updateState(dts);
        });
    };

   console.log(zdata)


    if (loading) {
        return <ActivityIndicator />;
    }
    return (
        <SafeAreaView>
            <Appbar style={styles.appbar}>
                <TouchableOpacity>
                    <Image style={{ width: 40, height: 40 }} source={{ uri: "https://img.icons8.com/ios/35/000000/instagram-new--v1.png" }} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={{ width: 40, height: 40 }} source={{ uri: "https://img.icons8.com/material-outlined/35/000000/facebook-messenger--v1.png" }} />
                </TouchableOpacity>
            </Appbar>
            <FlatList
                data={zdata}

                renderItem={({ item }) => (
                    <View >
                        <Image style={{width: '100%',  height: 400, resizeMode: "cover"}} source={{uri: `${item.image}`}}  />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
//  <Image source={{ uri: `${item.image}` }} style={{ width: '100%', maxHeight: '60vh' }} />
const styles = StyleSheet.create({
    appbar: {

        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: '#FBFCFE',
    },
    list: {
        width: '100%',
        backgroundColor: '#000',
    },
    item: {
        aspectRatio: 1,
        width: '100%',
        flex: 1,
    },
});
