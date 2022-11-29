import * as React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchOneListing, createListingAndOrder } from "../store/listing/thunk";
import { Props } from "../typed";
import { useEffect, useState } from "react";
import { selectOneListing } from "../store/listing/selector";
import { Listing } from "../typed";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Circle } from "react-native-maps";
import { clearSelectedListing } from "../store/listing/slice";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserInfo from "../componants/UserInfo";
import { Screen } from "react-native-screens";

//NOT IDEAL! -> the props definition
export function DetailsPage({ navigation, ...props }: any) {
  const dispatch = useAppDispatch();
  const id = props.route.params.id;

  const listingData: Listing = useAppSelector(selectOneListing);

  useEffect(() => {
    dispatch(fetchOneListing(id));
    return () => {
      dispatch(clearSelectedListing());
      setGeoLoc(null);
    };
  }, [dispatch, id]);

  type GeoLocation = {
    latitude: number;
    longitude: number;
  };

  const [geoLoc, setGeoLoc] = useState<GeoLocation | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [start_date, setStart_date] = useState<Date>(new Date());
  const [end_date, setEnd_date] = useState<Date>(new Date());

  const userAddress = listingData.user
    ? `${listingData?.user.street_name} ${listingData?.user.house_nr} Amsterdam`
    : "";

  const getGeocode = async () => {
    if (userAddress) {
      const response = await Location.geocodeAsync(userAddress);
      const latitude = response[0].latitude;
      const longitude = response[0].longitude;
      setGeoLoc({ latitude, longitude });
    }
  };

  useEffect(() => {
    getGeocode();
  }, [userAddress]);

  return (
    <View>
      <ScrollView>
        {!listingData ||
        !listingData.category ||
        !listingData.user ||
        !listingData.user.image ? (
          <Text>loading</Text>
        ) : (
          <View>
            <View style={styles.topContainer}>
              <Image
                style={styles.image}
                source={{ uri: listingData?.image }}
              />
              <Text style={styles.description}>
                {listingData.category.category}
              </Text>
              <Text style={styles.title}>{listingData.title}</Text>
              <Text style={styles.description}>{listingData.description}</Text>
            </View>
            <View style={styles.userContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{listingData.user.name}</Text>
                <Text>
                  {listingData.user.zip_code} {listingData.user.street_name}
                </Text>
              </View>
              <Image
                style={styles.avatarImage}
                source={{ uri: listingData?.user.image }}
              />
            </View>
            <View style={styles.mapContainer}>
              {geoLoc ? (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: geoLoc.latitude,
                    longitude: geoLoc.longitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                  }}
                >
                  <Circle
                    center={geoLoc}
                    radius={1000}
                    fillColor={"rgba(246,124,96,0.4)"}
                    strokeColor={"rgba(246,124,96,0.4)"}
                  />
                </MapView>
              ) : (
                <Text>loading map...</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={{ backgroundColor: "rgba(0,0,0,0.9)" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <AntDesign
              style={styles.modalCloseIcon}
              name="close"
              size={24}
              color="black"
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text style={styles.title}>{listingData.title}</Text>
            <View style={styles.modalListingContainer}>
              <Image
                style={styles.modalImage}
                source={{ uri: listingData?.image }}
              />
              <View style={styles.modalRightContainer}>
                <UserInfo user={listingData.user}></UserInfo>
              </View>
            </View>

            <View style={styles.datePickerContainer}>
              <View>
                <Text style={{ marginBottom: 8 }}>Start_date</Text>

                <DateTimePicker
                  testID="dateTimePicker"
                  value={start_date || new Date()}
                  is24Hour={true}
                  mode={"date"}
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setStart_date(selectedDate);
                    }
                  }}
                />
              </View>

              <View>
                <Text style={{ marginBottom: 8 }}>end_date</Text>

                <DateTimePicker
                  testID="dateTimePicker"
                  value={end_date || new Date()}
                  is24Hour={true}
                  mode={"date"}
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setEnd_date(selectedDate);
                    }
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                dispatch(
                  createListingAndOrder(
                    { start_date, end_date },
                    listingData.id
                  )
                );
                navigation.navigate("User", { screen: "Request" });
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}> Request Now</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}> Request this item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    // paddingLeft: 24,
    // paddingRight: 24,
  },
  datePicker: {},
  topContainer: {
    padding: 16,
  },

  image: {
    width: 340,
    height: 240,
    resizeMode: "cover",
    backgroundColor: "blue",
    marginBottom: 16,
    alignSelf: "center",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#657D90",
    fontWeight: "500",
    opacity: 0.8,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    resizeMode: "cover",
    backgroundColor: "blue",
  },
  name: {
    fontSize: 14,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 8,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingTop: 8,
    padding: 16,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 64,
  },
  map: {
    width: 332,
    height: 240,
  },
  modalButton: {
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "#293F51",
    height: 48,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    width: 160,
    // marginRight: 24,
    alignSelf: "flex-end",
  },
  button: {
    width: 180,
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "#293F51",
    height: 48,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
    marginBottom: 24,
    alignSelf: "flex-end",
    margin: 16,
  },
  buttonText: {
    color: "white",
    marginLeft: 0,
  },

  modalView: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 0,
    paddingTop: 64,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalCloseIcon: {
    position: "absolute",
    right: 24,
    top: 40,
  },
  modalImage: {
    width: 180,
    height: 100,
    resizeMode: "cover",
    backgroundColor: "blue",
    marginBottom: 16,
    alignSelf: "center",
  },

  modalListingContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },

  modalRightContainer: {
    flexBasis: "50%",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 64,
  },
});
