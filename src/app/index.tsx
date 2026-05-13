import { router } from "expo-router";
import { use, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../store/authStore";

const index = () => {
  const { signIn, signUp, user } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState<"register" | "login" | "none">(
    "none",
  );
  const [formData, setFormData] = useState({
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const error = await signIn(formData.email, formData.password);
    if (error) {
      setErrorMessage("Email o contraseña incorrectos");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleRegister = async () => {
    if (formData.password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    await signUp(formData.email, formData.nickName, formData.password);
  };

  useEffect(() => {
    if (user) router.replace("/home");
  }, [user]);

  const renderContext = () => {
    if (showLogin === "none")
      return (
        <View className="gap-4 mb-6">
          <Pressable
            onPress={() => setShowLogin("login")}
            className="bg-white rounded-full py-4 items-center"
          >
            <Text className="font-bold text-lg">Iniciar sesión</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/home")}
            className="border border-white rounded-full py-4 items-center"
          >
            <Text className="text-white font-bold text-lg">
              Continuar sin registrar
            </Text>
          </Pressable>
        </View>
      );

    if (showLogin === "login")
      return (
        <View className="gap-4 mb-6">
          {errorMessage && (
            <View className="bg-red-500 border border-red-400 rounded-2xl py-3 px-4">
              <Text className="text-black font-bold text-center text-sm">
                {errorMessage}
              </Text>
            </View>
          )}
          <TextInput
            cursorColor="#F5C400"
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.6)"
            className="border border-white rounded-full py-4 px-6 text-white"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => handleOnChange("email", value)}
          />
          <TextInput
            cursorColor="#F5C400"
            placeholder="Contraseña"
            placeholderTextColor="rgba(255,255,255,0.6)"
            className="border border-white rounded-full py-4 px-6 text-white"
            secureTextEntry
            onChangeText={(value) => handleOnChange("password", value)}
          />
          <Pressable
            onPress={handleLogin}
            className="bg-white rounded-full py-4 items-center"
          >
            <Text className="font-bold text-lg">Entrar</Text>
          </Pressable>
          <View className="flex-row justify-center items-center text-md">
            <Text className="text-white/70 items-center">
              ¿No tienes cuenta?
            </Text>
            <Pressable
              onPress={() => setShowLogin("register")}
              className="items-center"
            >
              <Text className="text-white/70 underline mx-2">
                Registrate aquí
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={() => router.push("/")} className="items-center">
            <Text className="text-white/70 text-md">VOLVER</Text>
          </Pressable>
        </View>
      );

    return (
      <View className="gap-4 mb-6">
        {errorMessage && (
          <View className="bg-red-500 border border-red-400 rounded-2xl py-3 px-4">
            <Text className="text-black font-bold text-center text-sm">
              {errorMessage}
            </Text>
          </View>
        )}
        <TextInput
          cursorColor="#F5C400"
          placeholder="Nombre o apodo"
          placeholderTextColor="rgba(255,255,255,0.6)"
          className="border border-white rounded-full py-4 px-6 text-white"
          autoCapitalize="none"
          onChangeText={(value) => handleOnChange("nickName", value)}
        />
        <TextInput
          cursorColor="#F5C400"
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.6)"
          className="border border-white rounded-full py-4 px-6 text-white"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => handleOnChange("email", value)}
        />
        <TextInput
          cursorColor="#F5C400"
          placeholder="Contraseña"
          placeholderTextColor="rgba(255,255,255,0.6)"
          className="border border-white rounded-full py-4 px-6 text-white"
          secureTextEntry
          onChangeText={(value) => handleOnChange("password", value)}
        />
        <TextInput
          cursorColor="#F5C400"
          placeholder="Repite contraseña"
          placeholderTextColor="rgba(255,255,255,0.6)"
          className="border border-white rounded-full py-4 px-6 text-white"
          secureTextEntry
          onChangeText={(value) => handleOnChange("confirmPassword", value)}
        />
        <Pressable
          onPress={handleRegister}
          className="bg-white rounded-full py-4 items-center"
        >
          <Text className="font-bold text-lg">Entrar</Text>
        </Pressable>
        <View className="flex-row justify-center items-center text-md">
          <Text className="text-white/70 items-center">¿Ya tienes cuenta?</Text>
          <Pressable
            onPress={() => setShowLogin("login")}
            className="items-center"
          >
            <Text className="text-white/70 underline mx-2">Inicia aquí</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => router.push("/")} className="items-center">
          <Text className="text-white/70 text-md">VOLVER</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-100}
      className="flex-1"
    >
      <ImageBackground
        source={require("../../assets/images/index/surf_index_natural.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1 bg-black/20">
          <SafeAreaView className="flex-1 justify-between p-6">
            {/* LOGO Y TÍTULO */}
            <View className="items-center mt-2">
              <Image
                source={require("../../assets/logo/logo_app.png")}
                style={{ width: 200, height: 200 }}
              />
            </View>

            {renderContext()}

            {/* BOTONES */}
          </SafeAreaView>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default index;
