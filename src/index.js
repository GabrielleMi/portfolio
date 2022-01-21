import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './components/home/Home';
import Project from './components/project/Project';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />} path="/">
					<Route
						element={<Project />}
						path="projets/:id"
					/>
					<Route
						element={<Home />}
						index
						path="/"
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	// eslint-disable-next-line no-undef
	document.getElementById('root')
);