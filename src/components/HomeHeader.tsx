import { Ionicons } from '@expo/vector-icons'
import { View, Text, Pressable } from 'react-native'


const HomeHeader = () => {
  return (
    <View className="px-5 pt-6">
        <Text className="text-sm text-gray-400">Sábado 26 Abril</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold">Hola Sergio o "Surfer"👋</Text>
          <Pressable className="text-end">
            <Ionicons name="settings-outline" size={26} color="gray" />
          </Pressable>
        </View>
      </View>
  )
}
export default HomeHeader