import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

class WineItem extends React.Component {

    _displayType(wine) {
        var type_style
        if (wine.type === "red") {
            type_style=styles.type_red
        }
        else if (wine.type === "white") {
            type_style=styles.type_white
        }
        else {
            type_style=styles.type_sparkling_white
        }

        return(
            <View style={type_style}>
            </View>
        )
    }

    render() {
        const { wine } = this.props
        return(
            <TouchableOpacity
                style={styles.main_container}
            >
                {this._displayType(wine)}
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <View style={styles.region_container}>
                            <Text style={styles.region_text} >{wine.region}</Text>
                            <Text style={styles.appelation_text } >{wine.appelation} {wine.cru}</Text>
                            <Text>{wine.cuvee}</Text>
                        </View>
                        <View style={styles.vintage_container}>
                            <Text style={styles.vintage_text} >{wine.vintage}</Text>
                        </View>
                    </View>
                    <View style={styles.comment_container}>
                        <Text style={styles.comment_text} >{wine.comments}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 120,
        flexDirection: 'row'
    },
    content_container: {
        flex: 4,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    region_container: {
        flex: 3,
    },
    vintage_container: {
        flex: 1,
        alignItems: 'center'
    },
    comment_container: {
        flex: 1
    },
    region_text: {
        fontWeight: "bold",
        fontSize: 20
    },
    appelation_text: {
        fontSize: 16
    },
    vintage_text: {
        fontSize: 16
    },
    comment_text: {
        fontStyle: "italic",
        fontSize: 14
    },
    type_red: {
        flex: 1,
        backgroundColor: '#8E2800'
    },
    type_white: {
        flex: 1,
        backgroundColor: '#FFF0A5'
    },
    type_sparkling_white: {
        flex: 1,
        backgroundColor: '#FFB03B'
    }
})

export default WineItem
