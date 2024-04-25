import * as ImagePicker from 'expo-image-picker'
import { Alert, Image, ScrollView, View } from 'react-native'

import { FavoriteGenres } from '@/components/favorite-genres'
import { Preferences } from '@/components/preferences'
import { User } from '@/components/user'
import { useAuth } from '@/hooks/useAuth'

export default function Profile() {
  const { user, updateUserProfile } = useAuth()

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return null
      }

      if (photoSelected.assets[0].uri) {
        if (
          photoSelected.assets[0].fileSize &&
          photoSelected.assets[0].fileSize / 1024 / 1024 > 5
        ) {
          return Alert.alert('Erro', 'Imagem grande de mais')
        }
      }

      updateUserProfile(photoSelected.assets[0].uri)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <Image
        source={require('@/assets/banner.png')}
        className="w-full h-52 -mb-16"
        alt="banner"
      />
      <View className="flex-1 px-4 pb-4">
        <User user={user} onPress={handleUserPhotoSelect} />
        <ScrollView>
          <FavoriteGenres />
          <Preferences />
        </ScrollView>
      </View>
    </View>
  )
}
