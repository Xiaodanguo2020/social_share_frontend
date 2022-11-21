import React, { useEffect, useState } from "react";
import { fetchListings } from "../store/listing/thunk";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectListings } from "../store/listing/selector";
import { CategoryType, Listing } from "../types";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ListingCard from "../componants/ListingCard";
import { Picker } from "@react-native-picker/picker";
import { TabView, SceneMap } from "react-native-tab-view";

export function ListingPage() {
  const dispatch = useAppDispatch();

  const listingData: Listing[] = useAppSelector(selectListings);

  const [filterCat, setFilterCat] = useState<string>("");

  const categoriesFromListing: string[] = [
    ...new Set(
      listingData.map((list) => {
        return list.category.category;
      })
    ),
  ];

  const [index, setIndex] = useState(0);
  const [routes] = useState(
    categoriesFromListing.map((cat) => ({ key: cat, title: cat }))
  );

  const categoryView = (category: string) => () => {
    const filterListingData = listingData?.filter((listing) => {
      if (category === "all") {
        return true;
      } else if (listing.category.category === category) {
        return true;
      } else {
        return false;
      }
    });
    return (
      <View style={styles.cardContainer}>
        {filterListingData.map((list) => {
          return <ListingCard key={list.id} listing={list} />;
        })}
      </View>
    );
  };

  const sceneMapObject = Object.fromEntries(
    ["all", ...categoriesFromListing].map((category) => [
      category,
      categoryView(category),
    ])
  );

  console.log(sceneMapObject);

  const renderScene = SceneMap(sceneMapObject);

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
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
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
