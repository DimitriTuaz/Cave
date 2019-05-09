import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux'
import { wine_colors, wine_color_names } from '../Helpers/WineData.js'

class WineTypePicker extends React.Component {

    // Display text only if it's the selected type
    _displayText(type) {
        if (type == this.props.type) {
            return(
                <View style={styles.text_container}>
                    <Text style={styles.text}> {wine_color_names[type]} </Text>
                </View>
            )
        }
    }

    // Display bubbles on top of the colored square if it's a sparkling wine
    _displayBubbles(type) {
        if (type.includes("sparkling")) {
            return (
                <Image
                    source={require('../Images/ic_bubbles.png')}
                    style={styles.bubbles}
                />
            )
        }
        else if (type == 'other') {
            return (
                <Text style={styles.other_mark}>?</Text>
            )
        }
    }

    // Display a border and enlarge the container for the selected type
    _mainContainerStyle(type) {
        if (type == this.props.type) {
            return ({
                width: 150,
                backgroundColor: '#990026',
                borderRadius: 10,
                //borderWidth: 2,
                //borderColor: wine_colors['red'],
            })
        }
        else {
            return({
                width: 70,
            })
        }
    }

    render() {
        const { currentType } = this.props

        // Sparkling and non-sparkling wine have the same base color
        let color = currentType.includes("sparkling") ?
            wine_colors[currentType.replace('_sparkling', '')] : wine_colors[currentType]

        return (
            <View style={[
                styles.main_container,
                this._mainContainerStyle(currentType)
            ]}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.dispatch({ type: 'TYPE', value: currentType })
                    }}
                >
                    <View style={ styles.icon_container }>
                        <View style={[
                            styles.bubbles_container,
                            { backgroundColor: color }
                        ]}>
                            {this._displayBubbles(currentType)}
                        </View>
                    </View>
                    {this._displayText(currentType)}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubbles_container: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    bubbles: {
        width: 60,
        height: 60
    },
    other_mark: {
        color: '#212121',
        fontSize: 20,
    },
    text_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        //color: '#212121',
        color: '#FFFFFFFF',
        fontSize: 20,
    }
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(WineTypePicker)
