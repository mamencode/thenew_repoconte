import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Image, ActivityIndicator, StatusBar, TouchableOpacity, View, Text, Button } from 'react-native';
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
import { Feather } from '@expo/vector-icons';
import PostItemScreen from './PostItemScreen';

const feedsCollection = collection(db, "feeds");
export default function FeedScreen() {
  const [zdata, setZData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [lastDoc, setLastDoc] = useState();

  const getInitialFeeds = async () => {
    setLoading(true)
    const thefeeds = []
    const q = query(feedsCollection, orderBy("timestamp", "desc"), limit(5));
    const snapshots = await getDocs(q)
    const lsDoc = snapshots.docs[snapshots.docs.length - 1]
    snapshots.forEach((doc) => {
      thefeeds.push({
        ...doc.data(),
        key: doc.id
      })
    })
    setZData(thefeeds)
    setLastDoc(lsDoc)
    setLoading(false)
  }
  useEffect(() => {
    getInitialFeeds()
  }, []);

  const updateState = (colls) => {
    const isCollEmpety = colls.size === 0;
    if (isCollEmpety) return
    if (!isCollEmpety) {
      const thefeeds = []
      colls.forEach(doc => {
        thefeeds.push({
          ...doc.data(),
          key: doc.id
        })
      })
      const lsdoc = colls.docs[colls.docs.length - 1];
      const theNewD = zdata.concat(thefeeds)
      console.log(theNewD);
      setZData(theNewD);
      setLastDoc(lsdoc);
      setLoading(false)
    }
  };
  const fetchMoreD = async () => {

    const q = query(
      feedsCollection,
      orderBy("timestamp", "desc"),
      startAfter(lastDoc),
      limit(3)
    );
    const snapshot = await getDocs(q)
    await updateState(snapshot)
  };
  console.log(zdata, "zzzz")
  const handlePress = () => {
    console.log("press triggerd");
    alert("triggred")
  }

  if (loading) {
    return <ActivityIndicator size="large" color="green"/>;
  }

  return (
    <SafeAreaView>
      <StatusBar />
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
        onEndReached={fetchMoreD}
        renderItem={({ item }) => (
          <PostItemScreen postPic={item.image} uid={item.uid} id={item.key} email={item.email} caption={item.caption} profilePic={item.profilePic} username={item.username}
           timestamp={item.timestamp} />
        )}
      />

    </SafeAreaView>
  );
}

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
