import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { wine_colors, wine_color_names } from '../Helpers/WineData.js'

class WineTypePicker extends React.Component {
    state = {
        selectedType: 'red'
    };

    _displayText(type, selected) {
        if (selected) {
            return(
                <View style={styles.text_container}>
                    <Text style={styles.text}> {wine_color_names[type]} </Text>
                </View>
            )
        }
    }

    _displayBubbles(type) {
        if (type.includes("sparkling")) {
            return (
                <Image
                    source={require('../Images/ic_bubbles.png')}
                    style={styles.image}
                />
            )
        }
    }

    _mainContainerStyle(selected) {
        if (selected == true) {
            return ({
                width: 120,
                borderWidth: 2,
                borderColor: wine_colors['red'],
                borderRadius: 10,
            })
        }
        else {
            return({
                width: 70,
            })
        }
    }

    render() {
        const { type, selectType, selected } = this.props
        let color = type.includes("sparkling") ?
            wine_colors[type.replace('_sparkling', '')] : wine_colors[type]


        return (
            <View style={[styles.main_container, this._mainContainerStyle(selected)]}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({selectedType: type})
                        selectType(type)
                    }}
                >
                    <View style={[
                        styles.image_container,
                        { backgroundColor: color }
                    ]}>
                        {this._displayBubbles(type)}
                    </View>
                    {this._displayText(type, selected)}
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
    image_container: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    image: {
        width: 60,
        height: 60
    },
    text_container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: '#212121',
    }
})

export default WineTypePicker
