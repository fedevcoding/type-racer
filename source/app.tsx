import React, {useEffect, useState} from 'react';
import {STATS} from './types.js';
import Racer from './Racer.js';
import {Box, Newline, Text, useInput} from 'ink';
import {randomId} from './utils.js';
import {HEIGHT, WIDTH} from './constants.js';

export default function App() {
	const [stats, setStats] = useState<STATS>({
		WPM: 0,
		ACC: 0,
		COR: 0,
		ERR: 0,
	});

	const [game, setGame] = useState({
		gameId: randomId(),
		gameOver: false,
	});

	useInput((_, key) => {
		if (key.return && game.gameOver) {
			setStats({
				WPM: 0,
				ACC: 0,
				COR: 0,
				ERR: 0,
			});

			setGame({
				gameId: randomId(),
				gameOver: false,
			});
		}
	});

	return (
		<>
			{game.gameOver ? (
				<Box height={HEIGHT} width={WIDTH}>
					<Text>
						Game Over! <Newline />
						Press Enter to play again
					</Text>
				</Box>
			) : (
				<Racer
					setStats={setStats}
					stats={stats}
					setGame={setGame}
					game={game}
				/>
			)}
		</>
	);
}
