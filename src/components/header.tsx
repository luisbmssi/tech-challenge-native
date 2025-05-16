import Icon from "@/assets/icons";
import { router, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BackButton from "./backButton";
import { useAuth } from "@/contexts/authContext";

type HeaderProps = {
  title?: string
  showBackButton?: boolean
}
export default function Header({ title, showBackButton = false }: HeaderProps) {
  const { signOut } = useAuth();
  const segments = useSegments()
  const currentRoute = segments[1]

  function handleSignout() {
    signOut()
  }


  return (
    currentRoute !== undefined ?
      <View style={s.container}>
        {
          showBackButton && (
            <View style={s.BackButton}>
              <BackButton />
            </View>
          )
        }
        <Text style={s.title}>{title || ""}</Text>
      </View>
      :
      <View>
        <View style={s.header}>
          <Text style={s.title}>Escola Desafio</Text>
          <View style={s.icons}>
            <Pressable onPress={() => router.push('/newPost')}>
              <Icon name="plus" />
            </Pressable>
            <Pressable onPress={handleSignout}>
              <Icon name="home" />
            </Pressable>
          </View>
        </View>
      </View>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    gap: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 8
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: "700"
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18
  },
  BackButton: {
    position: 'absolute',
    left: 0
  }
})