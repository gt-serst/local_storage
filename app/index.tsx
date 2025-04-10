import React, { useCallback, useState } from 'react';
import { router, Stack, useFocusEffect } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { useSQLiteContext } from 'expo-sqlite';
import { TransactionType, readAllTransactions, deleteTransaction } from './db';

export default function Index(){

	const [data, setData] = useState<TransactionType[]>([]);
	const db = useSQLiteContext();

	const loadData = async () => {
		const response = await readAllTransactions(db);
		setData(response);
	};

	const handleDelete = (id: number) => {
		deleteTransaction(db, id);
		loadData();
	};

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [])
	);

	const headerRight = () => {
		return (
			<TouchableOpacity
				onPress={() => router.push('/modal')}
				style={{ marginRight: 10 }}
			>
				<FontAwesome name='plus-circle' size={28} color='blue'/>
			</TouchableOpacity>
		);
	};

	return (
		<View>
			<Stack.Screen options={{ headerRight }} />
			<View>
				<FlatList
					data={data}
					renderItem={({ item }) => {
						return (
						<View style={{ padding: 10 }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between'
								}}
							>
								<View>
									<Text>{item.category}</Text>
									<Text>{item.amount}</Text>
									<Text>{item.date}</Text>
									<Text>{item.type}</Text>
									<Text>{item.description}</Text>
								</View>
								<View style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'flex-end',
									gap: 10
									}}
								>
									<TouchableOpacity
										onPress={() => {
											router.push(`/modal?id=${item.id}`);
										}}
										style={styles.button}
									>
										<Text style={styles.buttonText}>Edit</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => {
											handleDelete(item.id);
										}}
										style={[styles.button, { backgroundColor:'red' }]}
									>
										<Text style={styles.buttonText}>Delete</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		padding: 5,
		borderRadius: 5,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 12
	}
});
