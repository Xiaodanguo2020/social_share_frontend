// https://reactnavigation.org/docs/typescript/
// Your defined Param Type
// import { RootStackParamList } from "../typed/Route";
export type ListingStackParamList = {
  Listing: undefined;
  Details: { id: number };
};

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

// Helper from the library to generate Props Type (What is the Type of the props passing down in this component)
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">

// generate the Props Type for 'Details' this need to match the 'name' of this Navigation Component
export type DetailPageProps = NativeStackScreenProps<ListingStackParamList, "Details">;
