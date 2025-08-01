import { Stack } from "expo-router"
import { Colors } from "../constants/Colors"
import { useColorScheme } from "react-native"
import { StatusBar } from "expo-status-bar"
import { UserProvider } from "../contexts/UserContext"
import { BooksProvider } from "../contexts/BooksContext"
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <UserProvider>
      <BooksProvider>
        <StatusBar value="auto" />
        <Stack screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}>
          {/* Groups */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />

          {/* Individual Screens */}
          <Stack.Screen
            name="index"
            options={{
              title: "Planary",
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableOpacity onPress={() => console.log("Menu pressed")}>
                  <Ionicons name="menu" size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
              ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => console.log("Search pressed")}>
              //     <Ionicons name="search" size={24} color="black" style={{ marginRight: 10 }} />
              //   </TouchableOpacity>
              // ),
            }}
          />
        </Stack>
      </BooksProvider>
    </UserProvider>
  )
}