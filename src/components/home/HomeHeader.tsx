import { useAuthStore } from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native'


const HomeHeader = () => {
  const { user } = useAuthStore()
  const today = new Date();
  const dateNow = today.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }) 

  return (
    <View className="px-5 pt-6">
        <Text className="text-sm font-extrabold text-blue-400 uppercase">{dateNow}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl mt-1 font-bold">{`Hola ${user ? user.user_metadata?.nickName : 'Surfer'} 🤙`}</Text>
          <Pressable onPress={() => router.push('/settings')} className="text-end">
            <Ionicons name="settings-outline" size={26} color="gray" />
          </Pressable>
        </View>
      </View>
  )
}
export default HomeHeader