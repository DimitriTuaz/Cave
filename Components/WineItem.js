import React from 'react'
import { StyleSheet, View, Alert, Text, Image, TouchableOpacity } from 'react-native'
import { removeWineFromDB } from '../Database/Database'
import { wine_colors } from '../Helpers/WineData.js'

class WineItem extends React.Component {

    _removeFromCave(id) {
        Alert.alert(
            'Confirmation de la suppresion',
            'Enlever ce vin de ma cave ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => console.log("Canceled removing wine from cave"),
                    style: 'cancel'
                },
                {
                    text: 'Enlever',
                    onPress: () => {
                        removeWineFromDB(id)
                    }
                }
            ]
        )
    }

    _displayPhoto(photo, type) {
        if (photo) {
            return(
                <Image
                    style={styles.photo}
                    source={{uri: photo}}
                />
            )
        }
    }

    _displayCuvee(cuvee) {
        if (cuvee) {
            return(<Text>{cuvee}</Text>)
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

    // Return the RGB wine color code depending on the wine type
    _wineColor(type) {
        if (type.includes("sparkling")){
            return wine_colors[type.replace('_sparkling', '')]
        }
        else {
            return wine_colors[type]
        }
    }

    render() {
        const { wine } = this.props
        return(
            <View>
                <TouchableOpacity
                    style={styles.main_container}
                    onLongPress={() =>this._removeFromCave(wine.id)}
                >
                    <View style={styles.photo_container}>
                        {this._displayPhoto(wine.photo)}
                    </View>
                    <View style={styles.content_container}>
                        <View style={styles.left_container}>
                            <View style={styles.first_line_container}>
                                <View style={[
                                    styles.type_container,
                                    {backgroundColor: this._wineColor(wine.type)}
                                ]}>
                                    {this._displayBubbles(wine.type)}
                                </View>
                                <View style={styles.appelation_container}>
                                    <Text style={styles.appelation_text } >
                                        {wine.appelation} {wine.cru}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.producer_text} >{wine.producer}</Text>
                            {this._displayCuvee(wine.cuvee)}
                            <Text style={styles.region_text} >({wine.region})</Text>
                        </View>
                        <View style={styles.right_container}>
                            <View style={styles.vintage_container}>
                                <Text style={styles.vintage_text} >{wine.vintage}</Text>
                            </View>
                            <View style={styles.quantity_container}>
                                <Text style={styles.quantity_text} >x{wine.quantity}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={styles.bottom_line}></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        height: 130,
        flexDirection: 'row'
    },
    photo_container: {
        flex: 1
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    content_container: {
        flex: 3,
        flexDirection: 'row',
        marginLeft: 10,
    },
    left_container: {
        flex: 5,
    },
    right_container: {
        flex: 1,
    },
    first_line_container: {
        width: '100%',
        flexDirection: 'row',
    },
    type_container: {
        height: 20,
        width: 20,
        marginTop: 5,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbles: {
        width: 20,
        height: 20,
    },
    appelation_container: {
        marginLeft: 5,
    },
    appelation_text: {
        fontWeight: "bold",
        fontSize: 20
    },
    region_text: {
        fontSize: 14,
        fontStyle: "italic",
    },
    producer_text: {
        fontSize: 16
    },
    comment_text: {
        fontStyle: "italic",
        fontSize: 14
    },
    vintage_container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    vintage_text: {
        fontSize: 16,
        marginRight: 5,
        marginTop: 5,
    },
    quantity_container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    quantity_text: {
        fontSize: 20,
        marginRight: 5,
        marginBottom: 5,
    },
    bottom_line: {
        height: 1,
        backgroundColor: '#212121'
    }
})

export default WineItem
