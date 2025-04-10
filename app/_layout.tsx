import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function Layout() {

	const initializeDatabase = async (db: SQLiteDatabase) => {
		console.log("Creating database if needed");
		await db.execAsync(
			`CREATE TABLE IF NOT EXISTS transactions (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				category TEXT,
				amount INTEGER,
				date TEXT,
				type TEXT,
				description TEXT
			);`,
		);
	}
	return (
		<SQLiteProvider databaseName='local_storage.db' onInit={initializeDatabase}>
			<Stack>
				<Stack.Screen name='index' options={{ title: 'Home' }} />
				<Stack.Screen name='modal' options={{ presentation: 'modal'}} />
			</Stack>
		</SQLiteProvider>
	);
};
