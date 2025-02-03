import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ServerContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const { server } = useContext(ServerContext);
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch(`http://${server}/api/tags`)
      .then(res => res.json())
      .then(data => setModels(data.models || []))
      .catch(err => console.error('Error fetching models:', err));
  }, [server]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Models:</Text>
      <FlatList
        data={models}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate('Chat', { model: item.name })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addTile}>
        <Text>Add/Delete Models</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  tile: { padding: 15, backgroundColor: '#ddd', marginVertical: 5, borderRadius: 10 },
  addTile: { padding: 15, backgroundColor: '#ccc', marginVertical: 10, alignItems: 'center', borderRadius: 10 },
});

export default HomeScreen;


// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { ServerContext } from '../App';

// const HomeScreen = ({ navigation }) => {
//   const { server } = useContext(ServerContext);
//   const [models, setModels] = useState([]);

//   useEffect(() => {
//     fetch(`http://${server}/api/tags`)
//       .then(res => res.json())
//       .then(data => setModels(data.models || []))
//       .catch(err => console.error('Error fetching models:', err));
//   }, [server]);

//   return (
//     <View style={styles.container}>
//       <Text>Available Models:</Text>
//       <FlatList
//         data={models}
//         keyExtractor={(item) => item.name}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ChatScreen', { model: item.name })}>
//             <Text>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <TouchableOpacity style={styles.addTile}>
//         <Text>Add/Delete Models</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


// // const HomeScreen = () => {
// //   const { server } = useContext(ServerContext);
// //   const [models, setModels] = useState([]);

// //   useEffect(() => {
// //     fetch(`http://${server}/api/tags`)
// //       .then(res => res.json())
// //       .then(data => setModels(data.models || []))
// //       .catch(err => console.error('Error fetching models:', err));
// //   }, [server]);

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Available Models</Text>
// //       <FlatList
// //         data={models}
// //         keyExtractor={(item) => item.name}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity style={styles.tile}>
// //             <Text>{item.name}</Text>
// //           </TouchableOpacity>
// //         )}
// //       />
// //       <TouchableOpacity style={styles.addTile}>
// //         <Text>Add/Delete Models</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   tile: { padding: 15, backgroundColor: '#ddd', marginVertical: 5 },
//   addTile: { padding: 15, backgroundColor: '#ccc', marginVertical: 10, alignItems: 'center' }
// });

// export default HomeScreen;
