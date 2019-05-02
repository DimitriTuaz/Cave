import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import WineItem from './WineItem'
import { openDB, dropTable, select } from '../Database/Database'

class WineList extends React.Component {

    constructor(props) {
        super(props)
        openDB()
        this.state = {
            wines: []
        }
        this._test_callback = this._test_callback.bind(this)
    }

    _test_callback(res) {
        this.setState({wines: res})
    }

    refreshListFromDB() {
        select(this._test_callback)
    }

    render() {
        return (
            <View>
                <Button
                    color='#990026'
                    title="Refresh"
                    onPress={() => this.refreshListFromDB()}
                />
                <Button
                    color='#990026'
                    title="Ajouter un vin"
                    onPress={() => this.props.navigation.navigate("WineAdd")}
                />
                <FlatList
                    style={styles.list}
                    data={this.state.wines}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (<WineItem wine={item}/>)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
    }
})

export default WineList
