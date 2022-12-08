// https://reactnavigation.org/docs/typescript/
// Your defined Param Type
// import { RootStackParamList } from "../typed/Route";
export type StackParamList = {
  Listing: undefined;
  Details: { id: number };
  MapView: undefined;
  UserDashboard: undefined;
  CameraTryOut: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type BottomParamList = {
  User: undefined;
};

// Helper from the library to generate Props Type (What is the Type of the props passing down in this component)
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// generate the Props Type for 'Details' this need to match the 'name' of this Navigation Component
export type Props = NativeStackScreenProps<StackParamList, "Details">;
export type UserScreenProps = NativeStackScreenProps<BottomParamList, "User">;
