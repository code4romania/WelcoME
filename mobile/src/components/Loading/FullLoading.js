import React from 'react';

import { View, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
  },
});

export default () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator style={styles.loading} />
  </View>
);
