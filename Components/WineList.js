import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import WineItem from './WineItem'
import { openDB, selectFromDB } from '../Database/Database'

class WineList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            wines: []
        }
        this._select_callback = this._select_callback.bind(this)
        openDB()
        this.refreshListFromDB()
    }

    _select_callback(wine_list) {
        this.setState({wines: wine_list})
    }

    refreshListFromDB() {
        selectFromDB(this._select_callback, '*')
    }

    render() {
        return (
            <View>
                <Button
                    color='#990026'
                    title="Refresh"
                    onPress={() => this.refreshListFromDB()}
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
