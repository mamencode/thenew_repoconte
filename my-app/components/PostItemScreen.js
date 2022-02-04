import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from '../firebase-config';
import React, { useState, useEffect } from 'react';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import useLikesTwo from '../hooks/useLikesTwo';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');




function DoubleTapButton({ onDoubleTap, children }) {
  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      onDoubleTap && onDoubleTap();
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onHandlerStateChange}
      numberOfTaps={2}>
      {children}
    </TapGestureHandler>
  );
}

export default function PostItemScreen({ id, postPic, caption, username, uid, profilePic, timestamp }) {
  const {
    likes,
    hasLiked,
    hasSaved,
    comments,
    likePost,
    handleLikedDoble,
    isliked,
    savePost
  } = useLikesTwo(id);
  const navigation = useNavigation();
  let opacity = new Animated.Value(0);
  let anime = new Animated.Value(0.5)

  const StartAnimation = () => {
    console.log("event triggerd");
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500

    }).start(() => {
      opacity.setValue(0);
    })
    Animated.timing(anime, {
      toValue: 1,
      duration: 1500
    }).start(() => {
      anime.setValue(0.5)
    })
    handleLikedDoble()
  }
  const animatedStyles = [
    styles.heartConte,
    {
      opacity,
      transform: [
        { scale: anime }
      ]
    }
  ];
  const goToProfile = () => {

    navigation.navigate('Profile', {
      userId: uid,
      username: username,
      userProfilePic: profilePic
    });


  }
  return (
    <>
      <View style={styles.conte}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <View style={styles.headerleft}>
              <TouchableOpacity onPress={goToProfile}>
                <Avatar.Image size={30} source={{ uri: `${profilePic}` }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={goToProfile}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{username} </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Feather name="more-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <DoubleTapButton onDoubleTap={StartAnimation}>
          <View style={styles.wrapper}>
            <Image style={styles.theImage} source={{ uri: `${postPic}` }} />
            <Animated.View
              style={animatedStyles}
            >
              <AntDesign name="heart" size={100} color="#fc0a0a" />
            </Animated.View>

          </View>

        </DoubleTapButton>

        <View style={styles.footerWrapper}>
          <View style={styles.footer}>
            <View style={styles.footerleft}>
              <TouchableOpacity style={styles.footerLeftIcon}
                onPress={likePost}
              >
                {hasLiked ? (
                  <>
                    <AntDesign name="heart" size={24} color="#f21b1b" />
                  </>
                ) : (
                  <>
                    <AntDesign name="hearto" size={24} color="black" />

                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLeftIcon}>
                <Feather name="message-circle" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLeftIcon}>
                <FontAwesome5 name="paper-plane" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={savePost}
              >
                {hasSaved ? (
                  <>
                    <FontAwesome name="bookmark" size={24} color="black" />

                  </>) : (
                  <>
                    <FontAwesome name="bookmark-o" size={24} color="black" />

                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",

  },
  heartConte: {
    position: "absolute"
  },
  footerleft: {
    flexDirection: 'row',


    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeftIcon: {
    marginHorizontal: 10
  },
  footerWrapper: {
    backgroundColor: 'white',
    padding: 5,
    width: width,
  },
  footer: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 5,
    flexDirection: 'row',

    alignItems: 'center',
  },
  headerWrapper: {
    backgroundColor: 'white',
    padding: 5,
    width: width,
  },
  headerleft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conte: {
    marginVertical: 5,
  },
  header: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 5,
    flexDirection: 'row',

    alignItems: 'center',
  },
  theImage: {
    width: width,
    height: height * 0.6,
  },
});
