import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { ServerContext } from '../App';

const RunningModelsScreen = () => {
  const { server } = useContext(ServerContext);
  const [runningModels, setRunningModels] = useState([]);

  useEffect(() => {
    fetch(`http://${server}/api/running`)
      .then(res => res.json())
      .then(data => setRunningModels(data.models || []))
      .catch(err => console.error('Error fetching running models:', err));
  }, [server]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Running Models</Text>
      <FlatList
        data={runningModels}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.tile}>
            <Text>{item.name}</Text>
            <Button title="Unload" onPress={() => console.log('Unload', item.name)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  tile: { padding: 15, backgroundColor: '#ddd', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }
});

export default RunningModelsScreen;
