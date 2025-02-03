import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { ServerContext } from '../App';

const ModelsScreen = () => {
  const { server } = useContext(ServerContext);
  const [models, setModels] = useState([]);

  const fetchModels = () => {
    fetch(`http://${server}/api/tags`)
      .then(res => res.json())
      .then(data => setModels(data.models || []))
      .catch(err => console.error('Error fetching models:', err));
  };

  useEffect(() => {
    fetchModels();
  }, [server]);

  const deleteModel = (name) => {
    fetch(`http://${server}/api/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    }).then(() => fetchModels());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Models</Text>
      <FlatList
        data={models}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.tile}>
            <Text>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteModel(item.name)} />
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

export default ModelsScreen;
