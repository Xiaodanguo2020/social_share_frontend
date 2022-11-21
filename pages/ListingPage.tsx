import React, { useEffect } from "react";
import { fetchListings } from "../store/listing/thunk";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectListings } from "../store/listing/selector";
import { Listing } from "../types";
import { StyleSheet, Text, View } from "react-native";
import ListingCard from "../componants/ListingCard";

export function ListingPage() {
  const dispatch = useAppDispatch();

  const listingData: Listing[] = useAppSelector(selectListings);

  console.log("listingdata from selector", listingData);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {!listingData ? (
        <Text>loading</Text>
      ) : (
        <View style={styles.cardContainer}>
          {listingData.map((list) => {
            return <ListingCard key={list.id} listing={list} />;
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // maxWidth: 375,
  },
  cardContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100vw",
  },
});
