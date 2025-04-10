import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

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
			readTransaction();
		}
	}, [id]);

	const readTransaction = async () => {
		try {
			const response = await db.getFirstAsync<{
				category: string;
				amount: string;
				date: string;
				type: string;
				description: string;
			}>('SELECT category, amount, date, type, description FROM transactions WHERE id = ?;', [parseInt(id as string)]);
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
		} catch (error) {
			console.log("Error reading transaction:", error);
		}
	};

	const createTransaction = async () => {
		try {
			const response  = await db.runAsync(
				'INSERT INTO transactions (category, amount, date, type, description) VALUES (?, ?, ?, ?, ?);', [
					category,
					amount,
					date,
					type,
					description
				]
			);
			console.log("Transaction created successfully:", response);
			router.back()
		} catch (error){
			console.log("Error creating transaction:", error);
		}
	};

	const updateTransaction = async () => {
		try {
			const response = await db.runAsync(
				'UPDATE transactions SET category = ?, amount = ?, date = ?, type = ?, description = ? WHERE id = ?;', [
					category,
					amount,
					date,
					type,
					description,
					parseInt(id as string)
				]
			);
			console.log("Transaction updated successfully:", response);
			router.back();
		} catch (error) {
			console.log("Error updating transaction:", error);
		}
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
					onPress={async () => {editMode ? updateTransaction() : createTransaction()}}
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
