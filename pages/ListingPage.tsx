import React, { useEffect, useState } from "react";
import { fetchListings } from "../store/listing/thunk";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectListings } from "../store/listing/selector";
import { CategoryType, Listing } from "../types";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import ListingCard from "../componants/ListingCard";
import { Picker } from "@react-native-picker/picker";
import { TabView, SceneMap } from "react-native-tab-view";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type ListingStackParamList = {
  Listing: undefined;
  Details: { listingId: number };
};

type Props = NativeStackScreenProps<ListingStackParamList, 'Listing'>;

export function ListingPage({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const listingData: Listing[] = useAppSelector(selectListings);

  const [filterCat, setFilterCat] = useState("");

  const categoriesFromListing: string[] = [
    ...new Set(
      listingData.map((list) => {
        return list.category.category;
      })
    ),
  ];

  console.log(categoriesFromListing);

  const changeCategoryFilter = (value: string) => {
    setFilterCat(value);
  };

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const filterListingData = listingData?.filter((listing) => {
    if (filterCat === "") {
      return true;
    } else if (listing.category.category === filterCat) {
      return true;
    } else {
      return false;
    }
  });

  console.log("filter data", filterListingData);

  return (
    <ScrollView>
      <Picker selectedValue={filterCat} onValueChange={changeCategoryFilter}>
        {categoriesFromListing.map((cat) => {
          return <Picker.Item key={cat} label={cat} value={cat} />;
        })}
      </Picker>
      {!filterListingData ? (
        <Text>loading</Text>
      ) : (
        <View style={styles.cardContainer}>
          {filterListingData.map((list) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.navigate("Details", { listingId: list.id })
              }} key={list.id}>
                <ListingCard listing={list} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
