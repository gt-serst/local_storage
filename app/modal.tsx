import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { createTransaction, readTransaction, updateTransaction } from './db';

export default function Modal() {

	const { id } = useLocalSearchParams();
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");
	const [type, setType] = useState("");
	const [description, setDescription] = useState("");

	const [editMode, setEditMode] = useState(false);

	const db = useSQLiteContext();

	useEffect(() => {
		if (id) {
			setEditMode(true);
			handleRead();
		}
	}, [id]);

	const handleRead = async () => {
		const response = await readTransaction(db, parseInt(id as string))
		if (response) {
			console.log("Transaction readed successfully:", response);
			setCategory(response.category);
			setAmount(response.amount);
			setDate(response.date);
			setType(response.type);
			setDescription(response.description);
		}
		else {
			console.log('No transaction found with id:', id);
			router.back();
		}
	};

	const handleCreate = async () => {
		await createTransaction(db, category, amount, date, type, description);
		router.back()
	};

	const handleUpdate = async () => {
		await updateTransaction(db, parseInt(id as string), category, amount, date, type, description);
		router.back();
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen options={{ title: 'Item Modal'}} />
			<View
				style={{
					gap: 20,
					marginVertical: 20,
				}}
			>
				<TextInput
					placeholder='Category'
					value={category}
					onChangeText={(text => setCategory(text))}
					style={styles.textInput}
				/>
				<TextInput
					placeholder='Amount'
					value={amount}
					keyboardType='numeric'
					onChangeText={(text => setAmount(text))}
					style={styles.textInput}
				/>
				<TextInput
					placeholder='Date'
					value={date}
					onChangeText={(text => setDate(text))}
					style={styles.textInput}
				/>
				<TextInput
					placeholder='Type'
					value={type}
					onChangeText={(text => setType(text))}
					style={styles.textInput}
				/>
				<TextInput
					placeholder='Description'
					value={description}
					onChangeText={(text => setDescription(text))}
					style={styles.textInput}
				/>
			</View>
			<View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={[styles.button, { backgroundColor: 'red' }]}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={async () => {editMode ? handleUpdate() : handleCreate()}}
					style={[styles.button, { backgroundColor: 'blue' }]}
				>
					<Text style={styles.buttonText}>{editMode ? "Update" : "Save"}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	textInput: {
		borderWidth: 1,
		padding: 10,
		width: 300,
		borderRadius: 5,
		borderColor: "slategray",
	},
	button: {
		height: 40,
		width: 100,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	buttonText: {
		fontWeight: "bold",
		color: "white",
	},
});
