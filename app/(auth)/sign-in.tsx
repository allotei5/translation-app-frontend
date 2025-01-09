import { View, Text, StatusBar, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomInput from "@/components/CustomInput.component";
import CustomButton from "@/components/CustomButton.component";
import { Link, router } from "expo-router";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import useLoginUser from "@/hooks/useLoginUser";
import { storeCredential } from "@/utils";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setUser, setIsLogged } = useGlobalContext()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const validateForm = async (): Promise<boolean> => {
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

  const { loginUser, loading, error, success, data } = useLoginUser();

  const handleSubmit = async () => {
    const isValid = await validateForm();

    if (isValid) {
      // attempt to login
      loginUser({
        email: form.email,
        password: form.password,
      });
    }
  };

  useEffect(() => {
    if (loading) {
      Toast.show({
        type: "info",
        text1: "Logging in...",
      });
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const userToken = data.authentication.sessionToken;
      storeCredential("token", userToken);
      setUser({
        _id: data.__id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        __v: data.__v
      })
      setIsLogged(true);
      Toast.show({
        type: "success",
        text1: "Login successful!",
      });

      setTimeout(() => {
        router.replace("/(root)/home");
      }, 1500);
    }
  }, [success, data]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" className="bg-white" />
      <ScrollView className="bg-white">
        <View className="w-full min-h-[100vh] px-4">
          <Image
            source={images.learning}
            resizeMode="contain"
            className="h-[300px] max-w-[380px] w-full"
          />
          <Text className="text-center font-psemibold text-4xl capitalize">
            Sign In
          </Text>
          <Text className="text-lg text-gray-500 font-pregular text-center mb-5">
            Sign in now and connect effortlessly across languages! 🇬🇭
          </Text>
          <CustomInput
            label="email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            labelStyle=""
            containerStyle=""
            secureTextEntry={false}
            inputStyle=""
          />
          <CustomInput
            label="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            labelStyle=""
            containerStyle=""
            secureTextEntry={true}
            inputStyle=""
          />
          <CustomButton
            onPress={handleSubmit}
            isOnboarding={false}
            label="sign in"
          />
          <Text className="text-center mb-3 font-pregular capitalize">
            Don't have an account?{" "}
            <Link className="text-primary" href="/(auth)/sign-in">
              Sign up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
