import React from 'react'
import {
    Alert,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    Button,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
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
    wine_sizes,
    wine_comments,
    wine_quantity,
    wine_data_translation
} from '../Helpers/WineData'

const photoIcon = require('../Images/ic_wineBottle.png')

class WineAdd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            photo: photoIcon,
            customPhoto: false,
        }

        this._photoClicked = this._photoClicked.bind(this)
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
                            this.props.type,
                            this.props.cuvee,
                            this.props.size,
                            this.props.quantity,
                            this.props.comments,
                            this.state.customPhoto ? this.state.photo.uri : undefined
                        )
                        this._erase()
                    }
                }
            ]
        )
    }

    _erase() {
        this.props.dispatch({ type: 'ERASE'})
        this.setState({
            photo: photoIcon,
            customPhoto: false
        })
    }

    _photoClicked() {
        const options = {
            title: 'Photo de l\'étiquette',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('Taking photo canceled')
            }
            else if (response.error) {
                console.log('Taking photo error: ', response.error)
            }
            else {
                this.setState({
                    photo: { uri: response.uri},
                    customPhoto: true
                })
            }
        })

    }

    _renderPicker(category, items, dependsOn, hideTextInput) {
        return(
            <View style={styles.line_container}>
                <View style={styles.text_container}>
                    <Text style={styles.text}>
                        {wine_data_translation[category]}
                    </Text>
                </View>
                <View style={styles.picker_container}>
                    <WinePicker
                        category={category}
                        items={items}
                        dependsOn={dependsOn}
                        hideTextInput={hideTextInput}
                    />
                </View>
            </View>
        )
    }

    _photoSize() {
        if (this.state.customPhoto) {
            return ({
                width: '100%',
                height: '100%',
                borderRadius: 10,
            })
        }
        else {
            return ({
                width: 60,
                height: 140,
            })
        }
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>
                <View style={styles.upper_container}>
                    <View style={styles.upper_left_container}>
                        <TouchableOpacity onPress={() => this._photoClicked()}>
                            <View style={styles.photo_container}>
                                <Image
                                    style={this._photoSize()}
                                    source={this.state.photo}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.upper_right_container}>
                        {this._renderPicker('country', wine_countries)}
                        {this._renderPicker('vintage', wine_vintages, undefined, true)}
                        {this._renderPicker('region', wine_regions, 'country')}
                    </View>
                </View>
                {this._renderPicker('appelation', wine_appelations, 'region')}
                {this._renderPicker('cru', wine_crus, 'region')}
                {this._renderPicker('producer', this.props.producerList)}
                <View style={styles.type_container}>
                    <View style={styles.type_text_container}>
                        <Text style={styles.text}>
                            {wine_data_translation['type']}
                        </Text>
                    </View>
                    <View style={styles.type_list_container}>
                        <FlatList
                            data={wine_types}
                            keyExtractor={(item) => item}
                            horizontal={true}
                            renderItem={({item}) =>
                                <WineTypePicker
                                    currentType={item}
                                />
                            }
                        />
                    </View>
                </View>
                {this._renderPicker('cuvee')}
                {this._renderPicker('size', wine_sizes)}
                {this._renderPicker('quantity', wine_quantity)}
                {this._renderPicker('comments', wine_comments)}

                <Button
                    title='Ajouter à ma cave'
                    color='#73061D'
                    onPress={() => this._addToCave()}
                />
                <Button
                    title='Effacer'
                    color='#73061D'
                    onPress={() => this._erase()}
                />

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    upper_container: {
        height: 195,
        flexDirection: 'row'
    },
    upper_left_container: {
        flex: 3,
        justifyContent: 'flex-end',
    },
    upper_right_container: {
        flex: 5,
    },
    photo_container: {
        height: 165,
        backgroundColor: '#990026',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    photo: {
        width: 60,
        height: 140,
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
        height: 130,
        marginRight: 10,
    },
    type_text_container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    type_list_container: {
        flex: 4,
        marginLeft: 10,
    },
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(WineAdd)
