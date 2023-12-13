import React from 'react';
import {Box, Newline, Text, useApp, useInput} from 'ink';
import {HEIGHT, WIDTH} from './constants.js';
import Quote from './Quote.js';
import BlinkingInput from './Input.js';
// import BlinkingInput from './Input.js';

export default function App() {
	const {exit} = useApp();

	useInput((input, key) => {
		if (input === 'q' || key.escape) {
			exit();
		}
	});

	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				width={WIDTH}
				height={HEIGHT}
			>
				<Box
					height={'100%'}
					width={'68%'}
					flexDirection="column"
					justifyContent="space-between"
				>
					<Box
						borderStyle="round"
						borderColor="green"
						height={'60%'}
						width={'100%'}
					>
						{/* <Quote /> */}
					</Box>
					<Box
						borderStyle="round"
						borderColor="green"
						height={'40%'}
						width={'100%'}
					>
						<BlinkingInput />
					</Box>
				</Box>
				<Box
					borderStyle="round"
					borderColor="green"
					height={'100%'}
					width={'30%'}
				>
					<Text>
						<Text color={'green'}>Stats</Text>
						<Newline />
						<Newline />
						<Newline />
						<Text>WPM:</Text>
						<Newline />
						<Newline />
						<Text>Errors:</Text>
						<Newline />
						<Newline />
						<Text>Accuracy:</Text>
						<Newline />
						<Newline />
						<Text>Combo:</Text>
					</Text>
				</Box>
			</Box>
		</>
	);
}
