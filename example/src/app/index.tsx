import React from 'react';

import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  option: {
    fontSize: 16,
    paddingVertical: 16,
  },
});

export default function Page() {
  return (
    <View style={styles.container}>
      <Link href="/balance" style={styles.option}>EBT Balance Feature</Link>
      <Link href="/transfer" style={styles.option}>EBT Transfer Feature</Link>
    </View>
  );
}
