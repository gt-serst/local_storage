// import { useSQLiteContext } from 'expo-sqlite';

// const db = useSQLiteContext();

// export const initializeDatabase = async () => {
// 	try {
// 		const response = await db.runAsync(
// 			`CREATE TABLE IF NOT EXISTS transactions (
// 				id INTEGER PRIMARY KEY AUTOINCREMENT,
// 				category TEXT,
// 				amount INTEGER,
// 				date TEXT,
// 				type TEXT,
// 				description TEXT
// 			);`,
// 		);
// 		console.log("Database initialized successfully:", response);
// 	} catch (error) {
// 		console.log("Error initializing database:", error);
// 	}
// };

// export const createTransaction = async (category: string, amount: number, date: string, type: string, description: string) => {
// 	try {
// 		const response  = await db.runAsync(
// 			'INSERT INTO transactions (category, amount, date, type, description) VALUES (?, ?, ?, ?, ?);', [
// 				category,
// 				amount,
// 				date,
// 				type,
// 				description
// 			]
// 		);
// 		console.log("Transaction created successfully:", response);
// 	} catch (error){
// 		console.log("Error creating transaction:", error);
// 	}
// };

// export const readTransaction = async () => {
// 	try {
// 		const response = await db.runAsync(
// 			'SELECT * FROM transactions;',
// 		);
// 		console.log("Transaction readed successfully:", response);
// 	} catch (error) {
// 		console.log("Error reading transaction:", error);
// 	}
// };

// export const updateTransaction = async (id: number, category: string, amount: number, date: string, type: string, description: string) => {
// 	try {
// 		const response = await db.runAsync(
// 			'UPDATE transactions SET category = ?, amount = ?, date = ?, type = ?, description = ? WHERE id = ?;', [
// 				category,
// 				amount,
// 				date,
// 				type,
// 				description,
// 				id
// 			]
// 		);
// 		console.log("Transaction updated successfully:", response);
// 	} catch (error) {
// 		console.log("Error updating transaction:", error);
// 	}
// };

// export const deleteTransaction = async (id: number) => {
// 	try {
// 		const response = await db.runAsync(
// 			'DELETE FROM transactions WHERE id = ?;', [id]
// 		);
// 		console.log("Transaction deleted successfully:", response);
// 	} catch (error) {
// 		console.log("Error deleting transaction:", error);
// 	}
// };

// export default db;
