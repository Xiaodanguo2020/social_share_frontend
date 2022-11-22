import * as React from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchOneListing } from "../store/listing/thunk";
import { Props } from "../typed";
import { useEffect, useState } from "react";
import { selectOneListing } from "../store/listing/selector";
import { Listing } from "../typed";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { Marker, Circle } from "react-native-maps";

// export type NavigationPageType = {
//   navigation: Object;
//   route: { key: string; name: string; params: number };
// };

export function DetailsPage(props: Props /*NavigationPageType*/) {
  const dispatch = useAppDispatch();
  const id = props.route.params.id;
  console.log(props.route.params.id, "this should be route params");

  const listingData: Listing = useAppSelector(selectOneListing);

  useEffect(() => {
    dispatch(fetchOneListing(id));
  }, [dispatch, id]);

  //transfer user address into geoCode
  type GeoLocation = {
    latitude: number;
    longitude: number;
  };
  const [geoLoc, setGeoLoc] = useState<GeoLocation | null>(null);

  //   const [geoLocation,setGeoLocation]=useState<String>{{latitude: 0, longitude: 0}}

  const userAddress = listingData.user
    ? `${listingData?.user.street_name} ${listingData?.user.house_nr} Amsterdam`
    : "";

  const getGeocode = async () => {
    const response = await Location.geocodeAsync(userAddress);
    const latitude = response[0].latitude;
    const longitude = response[0].longitude;
    setGeoLoc({ latitude, longitude });
  };

  useEffect(() => {
    getGeocode();
  }, []);

  console.log("myGeoLoc", geoLoc);
  return (
    <ScrollView>
      {!listingData || !listingData.category || !listingData.user ? (
        <Text>loading</Text>
      ) : (
        <View>
          <View style={styles.topContainer}>
            <Image style={styles.image} source={{ uri: listingData.image }} />
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
              source={{ uri: listingData.user.image }}
            />
            {/* <Text style={styles.description}>{listingData.user.about}</Text> */}
          </View>
          <View style={styles.mapContainer}>
            {geoLoc && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: geoLoc.latitude,
                  longitude: geoLoc.longitude,
                  latitudeDelta: 0.0322,
                  longitudeDelta: 0.0221,
                }}
              >
                {/* <Marker coordinate={geoLoc}></Marker> */}
                <Circle
                  center={geoLoc}
                  radius={1000}
                  fillColor={"rgba(246,124,96,0.4)"}
                  strokeColor={"rgba(246,124,96,0.4)"}
                />
              </MapView>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    // alignItems: "center",
    padding: 24,
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
    width: 64,
    height: 64,
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
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  mapContainer: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
  },
  map: {
    width: 320,
    height: 200,
  },
});
