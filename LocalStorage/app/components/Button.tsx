import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';

function ButtonBasics() {
	return (
	  <View style={styles.container}>
		<TouchableHighlight
		  style={styles.button}
		  onPress={() => Alert.alert('You tapped the button!')}
		>
		  <Text style={styles.buttonText}>Create</Text>
		</TouchableHighlight>
		<TouchableHighlight
		  style={styles.button}
		  onPress={() => Alert.alert('You tapped the button!')}
		>
		  <Text style={styles.buttonText}>Read</Text>
		</TouchableHighlight>
		<TouchableHighlight
		  style={styles.button}
		  onPress={() => Alert.alert('You tapped the button!')}
		>
		  <Text style={styles.buttonText}>Update</Text>
		</TouchableHighlight>
		<TouchableHighlight
		  style={styles.button}
		  onPress={() => Alert.alert('You tapped the button!')}
		>
		  <Text style={styles.buttonText}>Delete</Text>
		</TouchableHighlight>
	  </View>
	);
  }

  const styles = StyleSheet.create({
	container: {
	  paddingTop: 60,
	  alignItems: 'center'
	},
	button: {
	  marginBottom: 30,
	  width: 260,
	  alignItems: 'center',
	  backgroundColor: '#84BABC'
	},
	buttonText: {
	  textAlign: 'center',
	  padding: 20,
	  color: 'white'
	}
  });

export default ButtonBasics;
