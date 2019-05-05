import React from 'react'
import { Alert, StyleSheet, View, ScrollView, Text, Button, FlatList } from 'react-native'
import WinePicker from '../Components/WinePicker'
import WineTypePicker from '../Components/WineTypePicker'
import { addWine } from '../Database/Database'
import {
    wine_countries,
    wine_regions,
    wine_appelations,
    wine_vintages,
    wine_crus,
    wine_types
} from '../Helpers/WineData'

class WineAdd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            country: 'France',
            region: '',
            appelation: '',
            vintage: undefined,
            cru: '',
            producer: '',
            type: 'red',
            size: '',
            cuvee: '',
            comments: '',
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

    render() {
        return (
            <ScrollView style={styles.main_container}>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Pays </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='Pays'
                            items={wine_countries}
                            initItem={this.state.country}
                            selectItem={(item) => this.setState({country: item})}
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Région </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='Région'
                            items={wine_regions}
                            dependsOn={this.state.country}
                            selectItem={(item) => this.setState({region: item})}
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Appelation </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='Appelation'
                            items={wine_appelations}
                            dependsOn={this.state.region}
                            selectItem={(item) => this.setState({appelation: item})}
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Millésime </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='Millésime'
                            items={wine_vintages}
                            selectItem={(item) => this.setState({vintage: item})}
                            hideTextInput={true}
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Cru </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='Cru'
                            items={wine_crus}
                            dependsOn={this.state.region}
                            selectItem={(item) => this.setState({cru: item})}
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>Domaine/Producteur</Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='Domaine/Producteur'
                            selectItem={(item) => this.setState({producer: item})}
                        />
                    </View>
                </View>

                <View style={styles.type_container}>
                    <View style={styles.type_text_container}>
                        <Text style={styles.text}>Type</Text>
                    </View>
                    <View style={styles.type_list_container}>
                        <FlatList
                            data={wine_types}
                            extraData={this.state.type}
                            keyExtractor={(item) => item}
                            horizontal={true}
                            renderItem={({item}) =>
                                <WineTypePicker
                                    type={item}
                                    selectType={(item) => this.setState({type: item})}
                                    selected={(item == this.state.type) ? true : false}
                                />
                            }
                        />
                    </View>
                </View>

                <Button
                    title='Ajouter à ma cave'
                    color='#73061D'
                    onPress={() => this.addToCave()}
                />

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    line_container: {
        height: 65,
    },
    text_container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    picker_container: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    text: {
        color: '#212121',
        marginLeft: 10,
    },
    type_container: {
        height: 120,
        marginRight: 10,
    },
    type_text_container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    type_list_container: {
        flex: 4,
    },
})

export default WineAdd
