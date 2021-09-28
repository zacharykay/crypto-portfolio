import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Invest from './pages/Invest';
import Portfolio from './pages/Portfolio';
import Error from './pages/Error';
import Layout from './components/Layout';
import AuthWrapper from './pages/AuthWrapper';
import PrivateRoute from './pages/PrivateRoute';
import PriceCharts from './pages/PriceCharts';

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Switch>
					<Layout>
						<Route exact path="/">
							<PriceCharts />
						</Route>
						<Route exact path="/invest">
							<Invest />
						</Route>
						<PrivateRoute exact path="/portfolio">
							<Portfolio />
						</PrivateRoute>
					</Layout>
					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</Router>
		</AuthWrapper>
	);
}

export default App;
