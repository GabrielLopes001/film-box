import { Dimensions, Image, Text, View } from 'react-native'

const { width, height } = Dimensions.get('window')

export type ActorDetailsProps = {
  id?: number
  gender: number
  known_for_department: string
  name: string
  popularity: number
  biography: string
  birthday: string
  deathday?: string
  place_of_birth: string
  profile_path: string
}

type Props = {
  actor: ActorDetailsProps
}

export function ActorDetails({ actor }: Props) {
  return (
    <>
      <View
        className="flex-row justify-center"
        style={{
          shadowColor: 'gray',
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
        }}
      >
        <View className="h-72 w-72 items-center overflow-hidden rounded-full border border-neutral-400">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${actor?.profile_path}`,
            }}
            style={{ height: height * 0.43, width: width * 0.74 }}
            alt="profile"
          />
        </View>
      </View>

      <View className="mt-6">
        <Text className="text-center text-3xl font-bold text-white">
          {actor?.name}
        </Text>
        <Text className="text-center text-base text-neutral-500">
          {actor?.place_of_birth}
        </Text>

        <View className="mx-1 mt-6 flex-row items-center justify-between rounded-full bg-neutral-700 p-4">
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Gender</Text>
            <Text className="text-sm text-neutral-300">
              {actor?.gender === 1 ? 'Female' : 'Masc'}
            </Text>
          </View>
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Birthday</Text>
            <Text className="text-sm  text-neutral-300">{actor?.birthday}</Text>
          </View>
          <View className="items-center border-r-2 border-r-neutral-400 px-2">
            <Text className="font-semibold text-white">Know for</Text>
            <Text className="text-sm  text-neutral-300">
              {actor?.known_for_department}
            </Text>
          </View>
          <View className="items-center px-2">
            <Text className="font-semibold text-white">Popularity</Text>
            <Text className="text-sm  text-neutral-300">
              {actor?.popularity}%
            </Text>
          </View>
        </View>

        <View className="my-6 space-y-2">
          <Text className="text-lg text-white">Biography</Text>
          {actor?.biography?.length > 0 ? (
            <Text className="tracking-wide text-neutral-400">
              {actor?.biography}
            </Text>
          ) : (
            <Text className="tracking-wide text-neutral-400">
              Unknown Biography
            </Text>
          )}
        </View>
      </View>
    </>
  )
}
