import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectListings } from "../store/listing/selector";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { LinkingContext } from "@react-navigation/native";
import ListingSmallCard from "../componants/ListingSmallCard";

export default function MapViewPage({ navigation }: { navigation: any }) {
  const listingData = useAppSelector(selectListings);
  const region = {
    latitude: 52.3728141784668,
    longitude: 4.893714427947998,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [userFilter, setUserFilter] = useState<Number>();

  //   listingData.map((listing) => ({
  //     latlng: {
  //       latitude: listing.user.latitude,
  //       longitude: listing.user.longitude,
  //     },
  //   }));
  //   const markers: {
  //     latlng: { latitude: number; longitude: number };
  //     // title: string;
  //     // description: string;
  //   }[] = [];
  // console.log("listingData", listingData);

  const filterListingData = listingData.filter((list) => {
    if (!userFilter) {
      return true;
    } else {
      return list.userId === userFilter;
    }
  });

  console.log("userFilter", userFilter);

  return (
    <View>
      {!listingData ? (
        <Text>LOADING...</Text>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapContainer}
            region={{
              latitude: 52.3728141784668,
              longitude: 4.893714427947998,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {listingData?.map((list, index) => (
              <Marker
                onPress={() => setUserFilter(list.user.id)}
                key={index}
                coordinate={{
                  latitude: list.user.latitude,
                  longitude: list.user.longitude,
                }}
              >
                <Image
                  style={styles.avatarImage}
                  source={{ uri: list.user.image }}
                />
              </Marker>
            ))}
          </MapView>
        </View>
      )}
      <ScrollView horizontal style={{ position: "absolute", bottom: 12 }}>
        <View>
          {!filterListingData ? (
            <Text>loading</Text>
          ) : (
            <View style={styles.bottomContainer}>
              {filterListingData.map((list) => {
                return (
                  <TouchableOpacity
                    key={list.id}
                    style={styles.cardContainer}
                    onPress={() =>
                      navigation.navigate("Details", { id: list.id })
                    }
                  >
                    <ListingSmallCard key={list.id} listing={list} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    padding: 8,
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    margin: 8,
  },
  mapContainer: {
    backgroundColor: "white",
    // width: 375,
    height: "100%",
  },
  avatarImage: {
    alignSelf: "flex-start",
    width: 48,
    height: 48,
    borderRadius: 9999,
    resizeMode: "cover",
    backgroundColor: "blue",
    shadowColor: "blue",
    shadowOpacity: 0.1,
  },
  avatarContainer: {
    backgroundColor: "red",
    width: 100,
    height: 100,
  },
});
