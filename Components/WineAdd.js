import React from 'react'
import { Alert, StyleSheet, View, Text, TextInput, Button, Picker } from 'react-native'
import { wine_countries, wine_regions, wine_appelations, empty_or_other } from '../Helpers/WineData'
import { addWine } from '../Database/Database'

class WineAdd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            country: '',
            region: '',
            appelation: '',
            vintage: 0
        }
    }

    addToCave () {
        Alert.alert(
            'Confirmation de l\'ajout',
            'Ajouter ce vin à ma cave ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => console.log("Canceled adding wine to cave"),
                    style: 'cancel'
                },
                {
                    text: 'Ajouter',
                    onPress: () => addWine(
                        this.state.country,
                        this.state.region,
                        this.state.appelation,
                        this.state.vintage
                    )
                }
            ]
        )
    }

    _displayOther (element) {
        if (element == 'Autre') {
            return (
                <View style={styles.other_container}>
                    <TextInput
                        style={styles.text_input}
                        placeholder='Autre...'
                        placeholderTextColor='#FFFFFF'
                    />
                </View>
            )
        }
        return null
    }

    render() {
        const country_items = []
        for (const [_, value] of wine_countries.entries()) {
            country_items.push(<Picker.Item label={value} value={value} />)
        }

        const region_items = []
        let regions = wine_regions[this.state.country] ? wine_regions[this.state.country] : empty_or_other
        for (const [_, value] of regions.entries()) {
            region_items.push(<Picker.Item label={value} value={value} />)
        }

        const appelation_items = []
        let appelations = wine_appelations[this.state.region] ? wine_appelations[this.state.region] : empty_or_other
        for (const [_, value] of appelations.entries()) {
            appelation_items.push(<Picker.Item label={value} value={value} />)
        }

        return (
            <View style={styles.main_container}>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Pays </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.country}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({country: itemValue})
                            }>
                            {country_items}
                        </Picker>
                    </View>
                    {this._displayOther(this.state.country)}
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Region </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.region}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({region: itemValue})
                            }>
                            {region_items}
                        </Picker>
                    </View>
                    {this._displayOther(this.state.region)}
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Appelation </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.appelation}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({appelation: itemValue})
                            }>
                            {appelation_items}
                        </Picker>
                    </View>
                    {this._displayOther(this.state.appelation)}
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Millésime </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <TextInput
                            style={styles.text_input}
                            onChangeText={(year) => this.setState({vintage: year})}
                            maxLength={4}
                            keyboardType='numeric'
                        />
                    </View>
                </View>
                <Button
                    title='Ajouter à ma cave'
                    color='#990026'
                    onPress={() => this.addToCave()}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#2F2F2F'
    },
    line_container: {
        height: 50,
        flexDirection: 'row'
    },
    text_container: {
        flex: 1,
        justifyContent: 'center'
    },
    picker_container: {
        flex: 3,
        justifyContent: 'center'
    },
    other_container: {
        flex: 3,
        justifyContent: 'center'
    },
    text: {
        color: '#9B9B9B',
        marginLeft: 5
    },
    text_input: {
        color: '#FFFFFF'
    },
    picker: {
        height: 50,
        width: 150,
        color: '#FFFFFF'
    }
})

export default WineAdd

/**/
