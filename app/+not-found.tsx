import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { View } from '@/components/Themed'
import { Text } from '@/components/ui/text'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text className="text-[20px] font-bold">
          This screen doesn't exist.
        </Text>

        <Link href="/" style={styles.link}>
          <Text className="text-[14px] font-bold">Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
