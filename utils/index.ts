import api from '@/api'
import * as Keychain from 'react-native-keychain'
import * as SecureStore from 'expo-secure-store';

export const storeCredential = async (key: string, value: string) :Promise<void> => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.log(error)
    }
}

export const retrieveCredential = async (key: string) :Promise<string | null> => {
    try {
        const credentials = await SecureStore.getItemAsync(key)
        return credentials
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUserBySessionToken = async () => {
    try {
        const response = await api.get("/user")
        return response
    } catch (error) {
        console.log(error)
        return false;  
    }
}