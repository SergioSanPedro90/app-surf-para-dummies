import { Ionicons } from '@expo/vector-icons'
import { View, Text, Pressable } from 'react-native'


const HomeHeader = () => {
  const today = new Date();
  const dateNow = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }) 

  return (
    <View className="px-5 pt-6">
        <Text className="text-sm text-gray-400 capitalize">{dateNow}</Text>
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