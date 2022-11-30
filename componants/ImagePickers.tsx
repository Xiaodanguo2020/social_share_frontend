import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const placeholderImg = {
  uri: "https://www.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg",
};

export default function ImagePickers(props: any) {
  // const [image, setImage] = useState<any | null>(null);
  const [requestPermission, setRequestPermittion] =
    ImagePicker.useCameraPermissions();

  const cloudinaryUpload = async (photo: ImagePicker.ImagePickerAsset) => {
    try {
      const data = new FormData();
      data.append("file", ("data:image/jpeg;base64," + photo.base64) as string);
      data.append("upload_preset", "lbkuiafx");
      data.append("cloud_name", "debgk6z4q");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/debgk6z4q/auto/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await response.json();
      props.setImage({ uri: file.secure_url });
    } catch (e) {
      console.log(e);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true,
    });

    if (!result.canceled) {
      await cloudinaryUpload(result.assets[0]);
    } else {
      Alert.alert("you did not select any image");
    }

    // console.log("this is the result", result);
  };

  const pickCameraAsync = async () => {
    if (!requestPermission?.granted) await setRequestPermittion();
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0,
      base64: true,
    });
    if (!result.canceled) {
      await cloudinaryUpload(result.assets[0]);
    } else {
      console.log(requestPermission);
    }
  };

  const imageSource = props.image !== null ? props.image : placeholderImg;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          // color="black"
          // backgroundColor="#293F51"
          onPress={pickImageAsync}
        >
          <Text style={styles.buttonText}>Choose image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // color="black"
          // backgroundColor="#293F51"
          onPress={pickCameraAsync}
        >
          <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "flex-start",
    padding: 8,
  },
  footerContainer: {
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#293F51",
    height: 40,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    width: 144,
    borderColor: "#293F51",
    borderWidth: 2,
    margin: 8,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  buttonText: {
    color: "#293F51",
    // margin: 64,
    marginLeft: 0,
  },
});
