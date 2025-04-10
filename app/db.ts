import { SQLiteDatabase } from 'expo-sqlite';

export type TransactionType = {
	id: number;
	category: string;
	amount: string;
	date: string;
	type: string;
	description: string;
};

export const initializeDatabase = async (db: SQLiteDatabase) => {
	try {
		const response = await db.execAsync(
			`CREATE TABLE IF NOT EXISTS transactions (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				category TEXT,
				amount INTEGER,
				date TEXT,
				type TEXT,
				description TEXT
			);`,
		);
		console.log("Database initialized successfully:", response);
	} catch (error) {
		console.log("Error initializing database:", error);
	}
};

export const createTransaction = async (
	db: SQLiteDatabase,
	category: string,
	amount: string,
	date: string,
	type: string,
	description: string) => {
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
	} catch (error){
		console.log("Error creating transaction:", error);
	}
};

export const readAllTransactions = async (db: SQLiteDatabase): Promise<TransactionType[]> => {
	try {
		const response = await db.getAllAsync<TransactionType>(
			'SELECT * FROM transactions;'
		);
		console.log("Transactions readed successfully:", response);
		return response;
	}
	catch (error) {
		console.log("Error reading transactions:", error);
		return [];
	}
};

export const readTransaction = async (db: SQLiteDatabase, id: number): Promise<TransactionType | null> => {
	try {
		const response = await db.getFirstAsync<TransactionType>(
			'SELECT * FROM transactions WHERE id = ?;', [id]
		);
		console.log("Transaction readed successfully:", response);
		return response;
	}
	catch (error) {
		console.log("Error reading transaction:", error);
		return null;
	}
};

export const updateTransaction = async (
	db: SQLiteDatabase,
	id: number,
	category: string,
	amount: string,
	date: string,
	type: string,
	description: string) => {
	try {
		const response = await db.runAsync(
			'UPDATE transactions SET category = ?, amount = ?, date = ?, type = ?, description = ? WHERE id = ?;', [
				category,
				amount,
				date,
				type,
				description,
				id
			]
		);
		console.log("Transaction updated successfully:", response);
	} catch (error) {
		console.log("Error updating transaction:", error);
	}
};

export const deleteTransaction = async (db: SQLiteDatabase, id: number) => {
	try {
		const response = await db.runAsync(
			'DELETE FROM transactions WHERE id = ?;', [id]
		);
		console.log("Transaction deleted successfully:", response);
	} catch (error) {
		console.log("Error deleting transaction:", error);
	}
};
