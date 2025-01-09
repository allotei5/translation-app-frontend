import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import { images } from "@/constants";
import CustomInput from "@/components/CustomInput.component";
import CustomButton from "@/components/CustomButton.component";
import { Link, router } from "expo-router";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import useRegisterUser from "@/hooks/useRegisterUser";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Too short!")
      .required("Password is required"),
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(form);
      return true;
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.errors[0],
      });
      return false;
    }
  };

  const { registerUser, loading, error, success, data } = useRegisterUser();

  const handleSubmit = async () => {
    // validate form
    const isValid = await validateForm();

    if (isValid) {
      // attempt to register user
      registerUser({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
      });
    }
  };

  if (loading) {
    Toast.show({
      type: "info",
      text1: "Creating your account...",
    });
  }

  if (error) {
    // console.log(error);
    Toast.show({
      type: "error",
      text1: error,
    });
  }

  if (success) {
    Toast.show({
      type: "success",
      text1: "Your account has been created. You can log in...",
    });

    setTimeout(() => {
      router.replace('/(auth)/sign-in');
    }, 3000);
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" className="bg-white" />
      <ScrollView
        // contentContainerStyle={{ height: "100%" }}
        className="bg-white"
      >
        <View className="w-full min-h-[100vh] px-4">
          <Image
            source={images.signUp}
            resizeMode="contain"
            className="h-[300px] max-w-[380px] w-full"
          />
          <View className="relative mt-5">
            <Text className="text-center font-psemibold text-4xl capitalize">
              Create your account
            </Text>
            <Text className="text-lg text-gray-500 font-pregular text-center mb-5">
              Create your account today and start breaking language barriers
              with ease! 🇬🇭
            </Text>
            <CustomInput
              label="first name"
              labelStyle=""
              value=""
              containerStyle=""
              secureTextEntry={false}
              inputStyle=""
              onChangeText={(value) => setForm({ ...form, firstName: value })}
            />
            <CustomInput
              label="last name"
              labelStyle=""
              value=""
              containerStyle=""
              secureTextEntry={false}
              inputStyle=""
              onChangeText={(value) => setForm({ ...form, lastName: value })}
            />
            <CustomInput
              label="email"
              labelStyle=""
              value=""
              containerStyle=""
              secureTextEntry={false}
              inputStyle=""
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <CustomInput
              label="password"
              labelStyle=""
              value=""
              containerStyle="pr-4"
              secureTextEntry={true}
              inputStyle=""
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
            <CustomInput
              label="confirm password"
              labelStyle=""
              value=""
              containerStyle="pr-4"
              secureTextEntry={true}
              inputStyle=""
              onChangeText={(value) =>
                setForm({ ...form, confirmPassword: value })
              }
            />
            <CustomButton
              // onPress={() => router.replace("/(auth)/sign-in")}
              isOnboarding={false}
              label="sign Up"
              onPress={handleSubmit}
            />
            <Text className="text-center mb-3 font-pregular capitalize">
              Already have an account?{" "}
              <Link className="text-primary" href="/(auth)/sign-in">
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
