import React from 'react'
import {
    Alert,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Button,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import WinePicker from '../Components/WinePicker'
import WineTypePicker from '../Components/WineTypePicker'
import { addWineToDB } from '../Database/Database'
import {
    wine_countries,
    wine_regions,
    wine_appelations,
    wine_vintages,
    wine_crus,
    wine_types,
    wine_size,
    wine_comments,
    wine_quantity,
    wine_data_translation
} from '../Helpers/WineData'

class WineAdd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'red'
        }
    }

    _addToCave() {
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
                    onPress: () => {
                        addWineToDB(
                            this.props.country,
                            this.props.region,
                            this.props.appelation,
                            this.props.vintage,
                            this.props.cru,
                            this.props.producer,
                            this.state.type,
                            this.props.cuvee,
                            this.props.size,
                            this.props.quantity,
                            this.props.comments
                        )
                    }
                }
            ]
        )
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['country']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='country'
                            items={wine_countries}
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['region']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='region'
                            items={wine_regions}
                            dependsOn='country'
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['appelation']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='appelation'
                            items={wine_appelations}
                            dependsOn='region'
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['vintage']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='vintage'
                            items={wine_vintages}
                            hideTextInput={true}
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['cru']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='cru'
                            items={wine_crus}
                            dependsOn='region'
                        />
                    </View>
                </View>
                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['producer']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='producer'
                        />
                    </View>
                </View>

                <View style={styles.type_container}>
                    <View style={styles.type_text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['type']}
                        </Text>
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
                                    // TO CHANGE ! Not using state anymore
                                    selectType={(item) => this.setState({type: item})}
                                    selected={(item == this.state.type) ? true : false}
                                />
                            }
                        />
                    </View>
                </View>

                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['cuvee']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='cuvee'
                        />
                    </View>
                </View>

                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['size']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='size'
                            items={wine_size}
                        />
                    </View>
                </View>

                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['quantity']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='quantity'
                            items={wine_quantity}
                        />
                    </View>
                </View>

                <View style={styles.line_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['comments']}
                        </Text>
                    </View>
                    <View style={styles.picker_container}>
                        <WinePicker
                            category='comments'
                            items={wine_comments}
                        />
                    </View>
                </View>

                <Button
                    title='Ajouter à ma cave'
                    color='#73061D'
                    onPress={() => this._addToCave()}
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

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(WineAdd)
