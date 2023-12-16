import React, {useEffect, useState} from 'react';
import {Box, Newline, Text} from 'ink';
import {HEIGHT, WIDTH} from './constants.js';
import Quote from './Quote.js';
import BlinkingInput from './Input.js';
import {STATS} from './types.js';
import {useQuery} from '@tanstack/react-query';
import {fetchQuote} from './utils.js';

type Params = {
	stats: STATS;
	setStats: React.Dispatch<React.SetStateAction<STATS>>;
	setGame: React.Dispatch<
		React.SetStateAction<{
			gameId: `${string}-${string}-${string}-${string}-${string}`;
			gameOver: boolean;
		}>
	>;
	game: {
		gameId: `${string}-${string}-${string}-${string}-${string}`;
		gameOver: boolean;
	};
};

export default function Racer({stats, setGame, game, setStats}: Params) {
	const [inputValue, setInputValue] = useState('');

	const {isPending, data: quote} = useQuery({
		queryKey: [game.gameId],
		queryFn: fetchQuote,
	});
	const [quoteCopy, setQuoteCopy] = useState<string>('');
	const [startTime, setStartTime] = useState<number>(0);

	useEffect(() => {
		if (quote) {
			setQuoteCopy(quote);
		}
	}, [quote]);

	useEffect(() => {
		if (!startTime) {
			setStartTime(Date.now());
		} else {
			const timeElapsed = Date.now() - startTime;
			const timeElapsedInMinutes = timeElapsed / 1000 / 60;
			const typedWords = quote?.length!! - quoteCopy.length;
			const WPM = Math.floor(typedWords / 5 / timeElapsedInMinutes);

			setStats(prev => ({
				...prev,
				WPM,
			}));
		}

		const splittedQuote = quoteCopy?.split(' ');
		// check if the user has typed the first word of the quote
		if (
			inputValue === splittedQuote[0] + ' ' ||
			(inputValue === splittedQuote[0] && splittedQuote.length === 1)
		) {
			setQuoteCopy(prev => prev.slice(inputValue.length));
			setInputValue('');
		}
	}, [inputValue]);

	useEffect(() => {
		if (quoteCopy === '' && !isPending) {
			setGame(prev => ({
				...prev,
				gameOver: true,
			}));
		}
	}, [quoteCopy]);

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
						<Quote
							isPending={isPending}
							quote={quoteCopy}
							typedData={inputValue}
						/>
					</Box>
					<Box
						borderStyle="round"
						borderColor="green"
						height={'40%'}
						width={'100%'}
					>
						<BlinkingInput onType={setInputValue} value={inputValue} />
					</Box>
				</Box>
				<Box
					borderStyle="round"
					borderColor="green"
					height={'100%'}
					width={'30%'}
				>
					<Text>
						<Text color={'green'}>
							Stats {game.gameOver ? 'true' : 'false'}
						</Text>
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
