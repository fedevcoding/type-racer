import React, {useEffect, useState} from 'react';
import {Box, Newline, Text} from 'ink';
import {HEIGHT, RANDOM_QUOTES_API, WIDTH} from './constants.js';
import Quote from './Quote.js';
import BlinkingInput from './Input.js';
import {STATS} from './types.js';
import {useQuery} from '@tanstack/react-query';

const fetchQuote = async (): Promise<string> => {
	const quote = (await (await fetch(RANDOM_QUOTES_API)).json())?.[0]?.content;
	return quote;
};

export default function App() {
	const [stats, setStats] = useState<STATS>({
		WPM: 0,
		ACC: 0,
		COR: 0,
		ERR: 0,
	});
	const [inputValue, setInputValue] = useState('');

	const {isPending, data: quote} = useQuery({
		queryKey: ['data'],
		queryFn: fetchQuote,
	});
	const [quoteCopy, setQuoteCopy] = useState<string>("");


	useEffect(() => {
		if (quote) {
			setQuoteCopy(quote);
		}
	}, [quote]);


	useEffect(() => {
		const splittedQuote = quoteCopy?.split(' ');
		// check if the user has typed the first word of the quote
		if(inputValue === splittedQuote[0] + ' ' || (inputValue === splittedQuote[0] && splittedQuote.length === 1)) {
			setQuoteCopy((prev) => prev.slice(inputValue.length));
			setInputValue('');
		}
	}, [inputValue]);


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
						<Quote isPending={isPending} quote={quoteCopy} typedData={inputValue} />
					</Box>
					<Box
						borderStyle="round"
						borderColor="green"
						height={'40%'}
						width={'100%'}
					>
						<BlinkingInput onType={setInputValue} value={inputValue}  />
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
						<Text>WPM: {stats.WPM}</Text>
						<Newline />
						<Newline />
						<Text>Errors: {stats.ERR}</Text>
						<Newline />
						<Newline />
						<Text>Accuracy: {stats.ACC}</Text>
						<Newline />
						<Newline />
						<Text>Combo: {stats.COR}</Text>
					</Text>
				</Box>
			</Box>
		</>
	);
}
