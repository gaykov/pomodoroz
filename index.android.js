'use strict';

import React from 'react-native';
import Timer from './Timer';

class Pomodoroz extends React.Component {
    render() {
        return <Timer />
    }
}

React.AppRegistry.registerComponent('pomodoroz', () => Pomodoroz);