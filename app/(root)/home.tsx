import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomModal from "@/components/CustomModal.component";
import useGetTranscripts, { Transcript } from "@/hooks/useGetTranscripts";
import { FlatList } from "react-native";

export const TranscriptCard = ({ transcript }: { transcript: Transcript }) => {
  return (
    <TouchableOpacity className="bg-primary rounded-lg px-4 py-8 my-1">
      <Text className="text-white font-psemibold text-base ">
        Translation -{" "}
        {new Date(transcript.createdAt).toLocaleString("en-US", {
          weekday: "long",
          hour: "numeric",
          minute: "numeric",
        })}
      </Text>
      <View className="flex flex-row justify-between">
        <Text className="text-white font-pregular text-base capitalize">
          {transcript.firstLanguage} - {transcript.secondLanguage}
        </Text>
        {/* <Text className="text-white font-pregular text-base">10:30</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const { user } = useGlobalContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    data: transcripts,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTranscripts();

  return (
    <SafeAreaView className="bg-gray-50 h-full flex-1 px-5">
      <StatusBar barStyle="dark-content" className="bg-gray-50" />
      <FlatList
        data={transcripts}
        keyExtractor={(item) => item._id}
        renderItem={(item) => <TranscriptCard transcript={item.item} />}
        ListHeaderComponent={() => (
          <View>
            <View className="flex items-end">
              <View className="bg-primary rounded-full w-12 h-12 justify-center items-center">
                <Text className="capitalize font-psemibold text-xl text-center text-white">
                  {user?.firstName[0]}
                </Text>
              </View>
            </View>
            <View>
              <Text className="font-psemibold text-xl">
                Welcome {user?.firstName} 👋🏾
              </Text>
              <Text className="font-pregular text-base text-gray-500">
                Get started by pressing the button below
              </Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        className="absolute bottom-8 left-0 right-0 items-center"
        onPress={() => setIsVisible(true)}
      >
        <View className="bg-white rounded-full w-24 h-24 justify-center items-center shadow">
          <FontAwesome
            name="microphone"
            size={24}
            style={{ color: "#A01D28" }}
          />
        </View>
      </TouchableOpacity>
      <CustomModal
        isVisible={isVisible}
        closeModal={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Home;
