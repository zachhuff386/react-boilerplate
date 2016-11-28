/// <reference path="../References.d.ts"/>
import * as React from 'react';
import Styles from '../Styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from './List';
import Alerts from './Alerts';

document.body.style.backgroundColor = Styles.colors.background;

export default class Main extends React.Component<void, void> {
	render(): JSX.Element {
		return <MuiThemeProvider muiTheme={Styles.theme}>
			<div>
				<List title="React Polymer"/>
				<Alerts/>
			</div>
		</MuiThemeProvider>;
	}
}
