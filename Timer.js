'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

const {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    AppStateIOS
} = React;

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeRemaining: 0,
            currentProfile: 0,
            timer: null,
            timeOnBackground: 0
        }
    }

    _handleIosAppStateChange(newState) {
        if (newState === 'background') {
            if (this.state.timeRemaining) {
                this.state.timeOnBackground = Math.ceil((new Date().getTime() / 1000));
            }
        } else {
            if (this.state.timeOnBackground) {
                const timeRemaining = Math.ceil(this.state.timeRemaining - ((new Date().getTime() / 1000) - this.state.timeOnBackground));
                this.setState({
                    timeRemaining,
                    timeOnBackground: 0
                });
            }
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            AppStateIOS.addEventListener('change', this._handleIosAppStateChange.bind(this));
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            AppStateIOS.removeEventListener('change', this._handleIosAppStateChange.bind(this));
        }
    }

    changeProfile(min) {
        if (this.state.timer) clearInterval(this.state.timer);

        if (this.state.currentProfile === min) {
            this.setState({
                timeRemaining: 0,
                currentProfile: 0
            });
        } else {
            const timer = setInterval(() => {
                this.setState({timeRemaining: this.state.timeRemaining - 1});
            }, 1000);

            this.setState({
                timer,
                timeRemaining: min * 60,
                currentProfile: min
            });
        }
    }

    _getNumericOutput() {
        const min = Math.floor(this.state.timeRemaining / 60),
            sec = this.state.timeRemaining - Math.floor(this.state.timeRemaining/60) * 60;

        return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={styles.timeContainer}
                >
                    <Text
                        style={styles.time}
                    >
                        {this._getNumericOutput()}
                    </Text>
                </View>

                <View
                    style={{flex: 2, alignItems: 'stretch', justifyContent: 'flex-start'}}
                >
                    <View
                        style={styles.switchContainer}
                    >
                        <TouchableOpacity
                            style={[styles.button, this.state.currentProfile === 25 && styles.buttonActive]}
                            onPress={this.changeProfile.bind(this, 25)}
                        >
                            <Text style={[styles.buttonText, this.state.currentProfile === 25 && styles.buttonTextActive]}>
                                25
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, {borderRightWidth: 0.5, borderLeftWidth: 0.5}, this.state.currentProfile === 5 && styles.buttonActive]}
                            onPress={this.changeProfile.bind(this, 5)}
                        >
                            <Text style={[styles.buttonText, this.state.currentProfile === 5 && styles.buttonTextActive]}>
                                5
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, this.state.currentProfile === 15 && styles.buttonActive]}
                            onPress={this.changeProfile.bind(this, 15)}
                        >
                            <Text style={[styles.buttonText, this.state.currentProfile === 15 && styles.buttonTextActive]}>
                                15
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const colors = {
    primary: '#1398c4',
    default: 'white'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary
    },

    timeContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    time: {
        color: colors.default,
        fontFamily: 'Helvetica-Light',
        fontSize: Dimensions.get('window').width / 3
    },

    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 20
    },

    button: {
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: colors.default,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonActive: {
        backgroundColor: colors.default
    },
    buttonText: {
        color: colors.default,
        fontFamily: 'Helvetica',
        fontSize: 16
    },
    buttonTextActive: {
        color: colors.primary
    }
});

export default Timer;