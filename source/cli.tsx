#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import App from './app.js';

const enterAltScreenCommand = '\x1b[?1049h';
process.stdout.write(enterAltScreenCommand);

render(<App />);
