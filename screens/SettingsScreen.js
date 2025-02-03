import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ServerContext } from '../App';

const SettingsScreen = () => {
  const { server, setServer } = useContext(ServerContext);
  const [newIP, setNewIP] = useState(server);

  return (
    <View style={styles.container}>
      <Text>Server IP:</Text>
      <TextInput style={styles.input} value={newIP} onChangeText={setNewIP} />
      <Button title="Save" onPress={() => setServer(newIP)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 }
});

export default SettingsScreen;
