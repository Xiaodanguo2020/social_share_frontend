import React, { useEffect, useState } from "react";
import {
  fetchListings,
  getCategories,
  createNewListing,
} from "../store/listing/thunk";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectListings, selectCategories } from "../store/listing/selector";

import { CategoryType, Listing } from "../typed";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  StatusBar,
} from "react-native";
import ListingCard from "../componants/ListingCard";
import { Picker } from "@react-native-picker/picker";
import { getTokenfromStore } from "../store/user/thunk";
import { AntDesign } from "@expo/vector-icons";
import ImagePickers from "../componants/ImagePickers";

export function ListingPage({ navigation }: { navigation: any }) {
  // useEffect(() => {
  //   const dispatch = useAppDispatch();
  //   dispatch(getTokenfromStore());
  // }, []);
  const dispatch = useAppDispatch();

  const listingData: Listing[] = useAppSelector(selectListings);
  const categoryData: CategoryType[] = useAppSelector(selectCategories);

  const [image, setImage] = useState<any | null>(null);
  const [filterCat, setFilterCat] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [itemCategory, selectItemCategory] = useState<number>(0);

  const imageURI = image?.uri;

  // const categoriesFromListing: string[] = [
  //   ...new Set(
  //     listingData.map((list) => {
  //       return list.category.category;
  //     })
  //   ),
  // ];

  // console.log(categoriesFromListing);

  // const changeCategoryFilter = (value: string) => {
  //   setFilterCat(value);
  // };

  const changeItemCategory = (value: number) => {
    selectItemCategory(value);
  };

  useEffect(() => {
    dispatch(fetchListings());
    // dispatch(getTokenfromStore());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
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
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"default"}
        showHideTransition={"fade"}
      />
      <ScrollView>
        {/* <Picker
          itemStyle={{ height: 72 }}
          selectedValue={filterCat}
          onValueChange={changeCategoryFilter}
        >
          {["Filter all", ...categoriesFromListing].map((cat) => {
            return <Picker.Item key={cat} label={cat} value={cat} />;
          })}
        </Picker> */}
        {!filterListingData ? (
          <Text>loading</Text>
        ) : (
          <View style={styles.cardContainer}>
            {filterListingData.map((list) => {
              return (
                <TouchableOpacity
                  key={list.id}
                  onPress={() =>
                    navigation.navigate("Details", { id: list.id })
                  }
                >
                  <ListingCard key={list.id} listing={list} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View>
        <Modal
          animationType="slide"
          transparent={false}
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
            <Text style={styles.title}>
              Listing item to share with your neigbours
            </Text>
            <View>
              <ImagePickers setImage={setImage} image={image} />
            </View>
            <View style={styles.inputContainer}>
              <View>
                <Text>title</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    setTitle(text);
                  }}
                />
              </View>
              <View>
                <Text>description</Text>
                <TextInput
                  // multiline={true}
                  // numberOfLines={2}
                  style={styles.multilineInput}
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.selectContainer}>
            <Text>Select category for your item</Text>
            <Picker
              itemStyle={{ height: 120, fontSize: 16 }}
              selectedValue={itemCategory}
              onValueChange={changeItemCategory}
            >
              {categoryData.map((cat) => {
                return (
                  <Picker.Item
                    key={cat.id}
                    label={cat.category}
                    value={cat.id}
                  />
                );
              })}
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(false);
              dispatch(
                createNewListing({ title, description, imageURI, itemCategory })
              );
              // console.log("did it come here");
            }}
          >
            <Text style={styles.buttonText}>Add now</Text>
          </TouchableOpacity>
        </Modal>
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Add New listing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    //
    marginLeft: 8,
  },
  logOutContainer: {
    height: 40,
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    width: 144,
    alignItems: "center",
    backgroundColor: "blue",
    height: 48,
    justifyContent: "center",
    color: "white",
    borderRadius: 32,
    shadowColor: "blue",
    shadowOpacity: 0.1,

    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  buttonText: {
    color: "white",
    // margin: 64,
    marginLeft: 0,
  },
  modalView: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 0,
    paddingTop: 32,
    widt: "100%",

    // flexDirection: "row",

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  modalCloseIcon: {
    position: "absolute",
    right: 24,
    top: 40,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#293F51",
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 4,
  },
  inputContainer: {
    // flex: 1,
    justifyContent: "center",

    backgroundColor: "white",
    width: "100%",
  },
  input: {
    // borderWidth: 1,
    backgroundColor: "rgba(41,63,81,0.1)",
    // borderColor: "#293F51",
    // borderStyle: "solid",
    height: 40,
    borderRadius: 4,
    marginBottom: 16,
    width: "100%",
  },
  multilineInput: {
    // borderWidth: 1,
    backgroundColor: "rgba(41,63,81,0.1)",
    // borderColor: "#293F51",
    // borderStyle: "solid",
    height: 48,
    borderRadius: 4,
    width: "100%",
  },
  selectContainer: {
    // backgroundColor: "rgba(41,63,81,0.1)",
    paddingleft: 16,
    margin: 24,
    marginTop: 0,
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
    alignSelf: "flex-end",
    margin: 16,
  },
});
