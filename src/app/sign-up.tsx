import { Link } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function SignUp() {
  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-1 justify-center items-center p-4 gap-5">
        <Text className="text-3xl font-bold text-gray-100">Movie App</Text>
        <TextInput
          className="w-full h-14 border border-gray-500 py-2.5 px-4 rounded-lg"
          placeholder="E-mail"
        />
        <TextInput
          className="w-full h-14 border border-gray-500 py-2.5 px-4 rounded-lg"
          placeholder="Password"
        />
        <TextInput
          className="w-full h-14 border border-gray-500 py-2.5 px-4 rounded-lg"
          placeholder="Confirm Password"
        />
        <TouchableOpacity style={{ width: '100%' }} activeOpacity={0.7}>
          <View className="w-full items-center justify-center rounded-md h-14 px-4 bg-blue-500">
            <Text className="text-gray-100 text-xl">Sign Up</Text>
          </View>
        </TouchableOpacity>
        <Link className="text-white mt-8" href="/">
          Login
        </Link>
      </View>
    </View>
  )
}
