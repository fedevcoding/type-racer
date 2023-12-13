import React from 'react';
import {Text} from 'ink';
import {RANDOM_QUOTES_API} from './constants.js';
import {useQuery} from '@tanstack/react-query';

const fetchQuote = async (): Promise<string> => {
	const quote = (await (await fetch(RANDOM_QUOTES_API)).json())?.[0]?.content;
	return quote;
};

export default function Quote() {
	const {isPending, data} = useQuery({
		queryKey: ['data'],
		queryFn: fetchQuote,
	});

	return <Text>{isPending ? 'Loading quote...' : data}</Text>;
}
