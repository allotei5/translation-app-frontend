import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const CustomTranslateInput = () => {
  return (
    <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
            <View className={`flex flex-row justify-start items-end px-2 bg-neutral-100 rounded-lg border border-gray-100 focus:border-primary-500`}>
                <TextInput placeholder='Write a message...' multiline className={`min-h-10 max-h-28 h-full rounded-lg font-pregular text-lg flex-1 text-left`} />
                <TouchableOpacity className={`bg-primary my-2 h-10 w-10 items-center justify-center rounded-full`}>
                    <MaterialIcons size={16} name='send' color="#fff"/>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CustomTranslateInput