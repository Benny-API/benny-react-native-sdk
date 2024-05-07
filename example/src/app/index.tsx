import React from 'react';

import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import BaseView from 'example/src/components/BaseView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 4,
  },
  option: {
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 16,
  },
});

export default function Page() {
  return (
    <BaseView>
      <View style={styles.container}>
        <Text style={styles.title}>EBT Balance Link</Text>
        <Link href="/balance" style={styles.option}>EBT Balance Link Feature</Link>
        <Text style={styles.title}>EBT Transfer</Text>
        <Link href="/transfer-link" style={styles.option}>Link card</Link>
        <Link href="/transfer" style={styles.option}>Transfer</Link>
        <Link href="/transfer-balance" style={styles.option}>Check balance</Link>
      </View>
    </BaseView>

  );
}
