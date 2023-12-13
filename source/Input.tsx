import React, {useEffect, useState} from 'react';
import {Text, useApp, useInput} from 'ink';

export default function BlinkingInput() {
	const [inputValue, setInputValue] = useState('');
	const [cursorVisible, setCursorVisible] = useState(true);
	const {exit} = useApp();
	const [isTyping, setIsTyping] = useState(false);

	// Effect to toggle cursor visibility every 500 milliseconds
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCursorVisible(prev => !prev);
		}, 500);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	// Handle user input
	useInput((input, key) => {
		setIsTyping(true);

		if (key.return) {
			// Trigger the onSubmit callback with the current input value
			// onSubmit(inputValue);
			// Clear the input value
			setInputValue('');
		} else if (key.escape) {
			// Exit the application on ESC key
			exit();
		} else if (key.backspace || key.delete) {
			// Handle both backspace and delete keys
			setInputValue(prev => prev.slice(0, -1));
		} else if (!key.ctrl && !key.meta) {
			// Append regular characters to the input value
			setInputValue(prev => prev + input);
		}
	});

	// Delay setting isTyping to false after 500 milliseconds
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsTyping(false);
		}, 600);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isTyping]);

	return (
		<Text>
			{'> '}
			{inputValue}
			{cursorVisible || isTyping ? '|' : ' '}
		</Text>
	);
}
