import { Text } from 'react-native';

function Button(){
	const name = 'Mosh';
	if (name)
		return (
			<Text>Hello {name}</Text>
		);
	return (
		<Text>Hello World!</Text>
	);
}

export default Button;
