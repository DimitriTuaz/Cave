import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import WineItem from './WineItem'
import WineData from '../Helpers/WineData'
import { openDB, dropTable, select } from '../Database/Database'

class WineList extends React.Component {

    constructor(props) {
        super(props)
        openDB()
        this.state = {
            wines: []
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    style={styles.list}
                    data={WineData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (<WineItem wine={item}/>)}
                />
                <Button title="Drop Table" onPress={() => dropTable()} />
                <Button title="Select" onPress={() => select()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
    }
})

export default WineList
