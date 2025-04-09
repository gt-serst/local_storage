import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { initializeDatabase, createTransaction, readTransaction, updateTransaction, deleteTransaction } from './db';

function Index(){
	useEffect(() => {
		initializeDatabase();
	}, []);
	return (
		<View style={styles.container}>
			<TouchableHighlight
				style={styles.button}
				onPress={() => createTransaction("", 0, "", "", "")}
			>
				<Text style={styles.buttonText}>Create</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles.button}
				onPress={() => readTransaction()}
			>
				<Text style={styles.buttonText}>Read</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles.button}
				onPress={() => updateTransaction("", 0, "", "", "", 0)}
			>
				<Text style={styles.buttonText}>Update</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles.button}
				onPress={() => deleteTransaction(1)}
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

export default Index;
