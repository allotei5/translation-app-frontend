import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import CustomInput from "./CustomInput.component";
import CustomButton from "./CustomButton.component";
import CustomDropDown from "./CustomDropDown.component";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import useCreateTranscript from "@/hooks/useCreateTranscript";
import Alert from "./Alert.component";

type AlertObject = {
  message: string,
  color: string,
}

const CustomModal = ({
  isVisible,
  closeModal,
}: {
  isVisible: boolean;
  closeModal: (value: boolean) => void;
}) => {
  const [firstLanguage, setFirstLanguage] = useState<null | string>(null);
  const [secondLanguage, setSecondLanguage] = useState<null | string>(null);
  const [customAlert, setCustomAlert] = useState<null|AlertObject>(null);
  // validation schema
  const validationSchema = Yup.object().shape({
    firstLanguage: Yup.string().required("Select the first language"),
    secondLanguage: Yup.string()
      .required("Select the second language")
      .notOneOf(
        [Yup.ref("firstLanguage"), null],
        "Second language cannot be the same as the first language"
      ),
  });

  const validateForm = async (): Promise<boolean> => {
    try {
      setCustomAlert(null);
      await validationSchema.validate({ firstLanguage, secondLanguage });
      return true;
    } catch (error: any) {
      setCustomAlert({
        color: "red",
        message: error.errors[0]
      });
      return false;
    }
  };

  const { createTranscript, loading, serverror, success, data} = useCreateTranscript();

  const handleSubmit = async () => {
    const isValid = await validateForm();

    if (isValid) {
      // create a transcript
      createTranscript({
        firstLanguage,
        secondLanguage
      })
    }
  };
  useEffect(() => {
    if (loading) {
      console.log(loading)
      setCustomAlert({
        color: 'gray',
        message: "loading..."
      })
    }
  }, [loading])

  useEffect(() => {
    if (serverror) {
      setCustomAlert({
        color: 'red',
        message: serverror
      })
    }
  }, [serverror])

  useEffect(() => {
    if (success) {
      setCustomAlert({
        color: 'green',
        message: 'Trascript created'
      })
    }
  }, [success, data])



  return (
    <View>
      <Modal isVisible={isVisible}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View className="bg-white rounded  py-10 w-full px-5">
            <Text className="font-psemibold text-xl mb-2">
              Select Languages
            </Text>
            {customAlert && (
              <Alert message={customAlert.message} color={customAlert.color} />
            )}
            <CustomDropDown
              label="select first language"
              languageValue={firstLanguage}
              setLanguage={setFirstLanguage}
            />
            <CustomDropDown
              label="select second language"
              languageValue={secondLanguage}
              setLanguage={setSecondLanguage}
            />

            <View className="flex flex-row gap-5 justify-end">
              <CustomButton
                onPress={() => {
                  setFirstLanguage(null)
                  setSecondLanguage(null)
                  setCustomAlert(null)
                  closeModal(false)
                }}
                label="Cancel"
                isPrimary={false}
                isOnboarding={false}
              />
              <CustomButton
                label="Proceed"
                isOnboarding={false}
                onPress={() => handleSubmit()}
                isPrimary={true}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
