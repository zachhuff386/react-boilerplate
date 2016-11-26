/// <reference path="../References.d.ts"/>
import * as React from 'react';
import styles from '../Styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import List from './List';

document.body.style.backgroundColor = styles.colors.background;

export default class Main extends React.Component<void, void> {
	render(): JSX.Element {
		return <MuiThemeProvider muiTheme={styles.theme}>
			<List title="React Polymer"/>
		</MuiThemeProvider>;
	}
}
