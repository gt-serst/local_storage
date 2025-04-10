import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./db";

export default function Layout() {

	return (
		<SQLiteProvider databaseName='local_storage.db' onInit={initializeDatabase}>
			<Stack>
				<Stack.Screen name='index' options={{ title: 'Home' }} />
				<Stack.Screen name='modal' options={{ presentation: 'modal'}} />
			</Stack>
		</SQLiteProvider>
	);
};
