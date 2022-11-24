import React, { useEffect, useState } from "react";
import { fetchListings } from "../store/listing/thunk";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectListings } from "../store/listing/selector";
import { logOut } from "../store/user/slice";
import { Listing } from "../typed";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ListingCard from "../componants/ListingCard";
import { Picker } from "@react-native-picker/picker";
import { getTokenfromStore } from "../store/user/thunk";

export function ListingPage({ navigation }: { navigation: any }) {
  // useEffect(() => {
  //   const dispatch = useAppDispatch();
  //   dispatch(getTokenfromStore());
  // }, []);
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

  // console.log(categoriesFromListing);

  const changeCategoryFilter = (value: string) => {
    setFilterCat(value);
  };

  useEffect(() => {
    dispatch(fetchListings());
    // dispatch(getTokenfromStore());
  }, [dispatch]);

  const filterListingData = listingData?.filter((listing) => {
    if (filterCat === "" || filterCat === "Filter all") {
      return true;
    } else if (listing.category.category === filterCat) {
      return true;
    } else {
      return false;
    }
  });

  // console.log("filter data", filterListingData);

  return (
    <ScrollView>
      <Picker
        itemStyle={{ height: 72 }}
        selectedValue={filterCat}
        onValueChange={changeCategoryFilter}
      >
        {["Filter all", ...categoriesFromListing].map((cat) => {
          return <Picker.Item key={cat} label={cat} value={cat} />;
        })}
      </Picker>
      {!filterListingData ? (
        <Text>loading</Text>
      ) : (
        <View style={styles.cardContainer}>
          {filterListingData.map((list) => {
            return (
              <TouchableOpacity
                key={list.id}
                onPress={() => navigation.navigate("Details", { id: list.id })}
              >
                <ListingCard key={list.id} listing={list} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <TouchableOpacity
        style={styles.logOutContainer}
        onPress={() => {
          dispatch(logOut());
          navigation.navigate("Login");
        }}
      >
        <Text>Logout here temporarily</Text>
      </TouchableOpacity>
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
  logOutContainer: {
    height: 40,
  },
});
