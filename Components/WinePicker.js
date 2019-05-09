import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { wine_data_translation } from '../Helpers/WineData'

class WinePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _updateItem(item) {
        if (item == 'Champagne') {
            this.props.dispatch({ type: 'TYPE', value: 'white_sparkling' })
        }
        const action = { type: this.props.category.toUpperCase(), value: item }
        this.props.dispatch(action)
    }

    _displayTextInput(hideTextInput) {
        if (hideTextInput == true ) {
            return
        }
        return(
            <View style={styles.text_input_container}>
                <TextInput
                    placeholder='Autre...'
                    placeholderTextColor='#828282'
                    multiline={false}
                    style={styles.item_text}
                    onChangeText={(text) => this._updateItem(text)}
                    onSubmitEditing={() => this.setModalVisible(!this.state.modalVisible)}
                />
            </View>
        )
    }

    render() {
        const { category, items, hideTextInput, dependsOn } = this.props

        let list_items = items
        if (dependsOn != undefined) {

            if (this.props[dependsOn] in items) {
                list_items = items[this.props[dependsOn]]
            }
            else {
                list_items = items["default_list"]
            }
        }
        return (
            <View style={styles.main_container}>
                <Modal
                    isVisible={this.state.modalVisible}
                    backdropOpacity={0.90}
                    avoidKeyboard={false}
                    onBackButtonPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                >
                    <View style={styles.modal_container}>
                        <View style={styles.category_container}>
                            <Text style={styles.category_text}>
                                {wine_data_translation[category]}
                            </Text>
                        </View>
                        <HideWithKeyboard style={styles.list_container}>
                            <FlatList
                                data={list_items}
                                keyExtractor={(item) => item.toString()}
                                renderItem={({item}) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._updateItem(item)
                                            this.setModalVisible(!this.state.modalVisible)
                                        }}
                                    >
                                        <View style={styles.item_container}>
                                            <Text style={styles.item_text}>
                                                {item}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                        </HideWithKeyboard>
                        {this._displayTextInput(hideTextInput)}
                        <View style={styles.validation_button_container}>
                            <Button
                                color='#990026'
                                title="OK"
                                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                            />
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                    onPress={() => this.setModalVisible(true)}
                >
                    <View style={styles.button_container}>
                        <View style={styles.button_text_container}>
                            <Text style={styles.button_text}>
                                {this.props[category]}
                            </Text>
                        </View>
                        <View style={styles.button_icon_container}>
                            <Image
                                source={require('../Images/ic_chevronDown.png')}
                                style={styles.button_icon}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
    },
    modal_container: {
        flex: 1,
    },
    category_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    category_text: {
        color: '#FFFFFF',
        fontSize: 25,
        textTransform: 'uppercase',
    },
    list_container: {
        flex: 6,
    },
    item_container: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginTop: 4,
    },
    item_text: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    text_input_container: {
        flex: 1,
        justifyContent: 'center',
    },
    validation_button_container: {
        flex: 1,
        justifyContent: 'center',
    },
    button_container: {
        height: 35,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        backgroundColor: '#990026',
        borderRadius: 5,
    },
    button_text_container: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        flex: 8,
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 10,
    },
    button_icon_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_icon: {
        width: 15,
        height: 15,
    }
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(WinePicker)
