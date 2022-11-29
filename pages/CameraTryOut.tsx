import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  ImageURISource,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const placeholderImg = {
  uri: "https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
};

export const CameraTryOut = () => {
  const [image, setImage] = useState<any | null>(null);
  const [requestPermission, setRequestPermittion] =
    ImagePicker.useCameraPermissions();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    } else {
      Alert.alert("you did not select any image");
    }

    console.log("this is the result", result);
  };

  const pickCameraAsync = async () => {
    if (!requestPermission?.granted) await setRequestPermittion();
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    } else {
      console.log(requestPermission);
    }
  };

  const imageSource = image !== null ? image : placeholderImg;

  return (
    <View style={styles.container}>
      <View>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          // color="black"
          // backgroundColor="#293F51"
          onPress={pickImageAsync}
        >
          <Text style={styles.buttonText}>choose your image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // color="black"
          // backgroundColor="#293F51"
          onPress={pickCameraAsync}
        >
          <Text style={styles.buttonText}>take a photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    // flex: 1,
    padding: 24,
    // paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 18,
    padding: 16,
    alignSelf: "center",
  },
  button: {
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "#293F51",
    height: 48,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    width: 180,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    // margin: 64,
    marginLeft: 0,
  },
});
