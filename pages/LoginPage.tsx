import React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login } from "../store/user/thunk";
import { selectToken, selectErrorMessage } from "../store/user/selector";
import { useSelector } from "react-redux";
import { useForm, Resolver } from "react-hook-form";
import { FormValues } from "../typed";

export const LoginPage = ({ navigation }: { navigation: any }) => {
  const resolver: Resolver<FormValues> = async (values) => {
    const errors = !values.email;

    return {
      values: values.email || values.password ? values : {},
      errors: !values.email
        ? {
            email: {
              type: "required",
              message: "email is required",
            },
          }
        : !values.password
        ? {
            password: {
              type: "required",
              message: "password is required",
            },
          }
        : {},
    };
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  useEffect(() => {
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const token = useSelector(selectToken);
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    if (token) {
      navigation.navigate("Main");
      //   console.log(token, "this is the best feeling in the world");
    }
  }, [token]);

  //   const onSubmit = (data: any) => {
  //     dispatch(login(email, password));
  //     console.log("this is my onsubmit", data);
  //   };

  const onSubmit = handleSubmit((data) => dispatch(login(data)));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setValue("email", text);
        }}
      />
      {errors?.email ? <Text>{errors.email?.message}</Text> : <Text>{""}</Text>}
      <Text style={styles.label}>password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => {
          setValue("password", text);
        }}
      />
      {errors?.password ? (
        <Text>{errors.password?.message}</Text>
      ) : (
        <Text>{""}</Text>
      )}

      <Pressable
        style={styles.button}
        // color="black"
        // backgroundColor="#293F51"
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Text></Text>
      )}
      {/* <Text>LoginPage</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(login("yuqi@yuqi.com", "yuqi"));
        }}
      >
        <Text>This is cool button long enough to be pressed</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#293F51",
    margin: 8,
    marginLeft: 0,
  },
  button: {
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "#293F51",
    height: 48,
    justifyContent: "center",
    color: "white",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    // margin: 64,
    marginLeft: 0,
  },
  errorText: {
    color: "red",
    // margin: 64,
    marginLeft: 0,
    fontSize: 16,
    paddingTop: 16,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    // borderWidth: 1,
    backgroundColor: "rgba(41,63,81,0.1)",
    // borderColor: "#293F51",
    // borderStyle: "solid",
    height: 48,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});
