import { View, Text, StatusBar, Image, ImageBackground } from "react-native";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import GoogleButton from "@/components/GoogleButton.component";
import FacebookButton from "@/components/FacebookButton.component";
import CustomButton from "@/components/CustomButton.component";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

interface LanguagePillsProps {
  language: string;
}

const LanguagePills: React.FC<LanguagePillsProps> = ({ language }) => {
  return (
    <Text className="px-9 py-2 bg-white text-center capitalize font-pregular text-primary rounded-full">
      {language}
    </Text>
  );
};

const Onboarding = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged ) return <Redirect href="/(root)/home" />

  const languages = ["english", "twi", "ewe", "ga", "fante", "dagbani"];

  const continueWithEmail = () => {

  }
  return (
    <SafeAreaView className="h-full">
      <StatusBar barStyle="dark-content" className="bg-primary" />
      <View className="h-1/2 bg-primary px-4">
        <ImageBackground
          source={images.gh}
          resizeMode="contain"
          className="w-full h-full"
        >
          <View className="flex flex-row flex-wrap my-16 gap-5">
            {languages.map((language, index) => (
              <LanguagePills key={index} language={language} />
            ))}
          </View>
          <Text className="text-white font-psemibold text-4xl capitalize">
            Bridging Language Barriers in Ghana
          </Text>
          <Text className="text-white font-pregular capitalize text-lg my-3">
            communicate without limits, understand without barriers
          </Text>
        </ImageBackground>
      </View>
      <View className="px-4 justify-center h-1/2">
        <GoogleButton />
        <FacebookButton />
        <CustomButton onPress={() => router.replace('/(auth)/sign-in')} isOnboarding={true} label="Continue with email" />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
