'use strict';

import React from 'react-native';

const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} = React;

class Pomodoroz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeRemaining: 0,
            currentProfile: 0,
            timer: null
        }
    }

    changeProfile(min) {
        this.setState({timeRemaining: min * 60});

        const timer = setInterval(() => {
            this.setState({timeRemaining: this.state.timeRemaining - 1});
        }, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.timeRemaining}</Text>

                <TouchableOpacity
                    onPress={this.changeProfile.bind(this, 25)}
                >
                    -----25-----
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('pomodoroz', () => Pomodoroz);
