import { View, Text, TouchableOpacity, Image } from 'react-native'
import { images } from '@/constants'

const GoogleButton = () => {
  return (
    <TouchableOpacity className='flex flex-row gap-3 items-center justify-center border-2 border-gray-200 rounded-xl py-4 my-4'>
        <Image source={images.google} resizeMode='contain' className='w-[35px] h-[35px]' />
        <Text className='font-pregular text-lg'>Continue with Google</Text>
    </TouchableOpacity>
  )
}

export default GoogleButton