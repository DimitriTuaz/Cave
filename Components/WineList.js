import React from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import WineItem from './WineItem'
import WineData from '../Helpers/WineData'

class WineList extends React.Component {

    constructor(props) {
        super(props)
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
            </View>
        )
    }
}

/**/

const styles = StyleSheet.create({
    list: {
    }
})

export default WineList
