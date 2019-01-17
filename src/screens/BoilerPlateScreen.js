import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class BoilerPlateScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BoilerPlateScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BoilerPlateScreen;
