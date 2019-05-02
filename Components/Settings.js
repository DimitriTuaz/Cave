import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { dropTable, select } from '../Database/Database'

class Settings extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.inter_view}></View>
                <Button
                    color='#990026'
                    title="Clear Database"
                    onPress={() => dropTable()}
                />
                <View style={styles.inter_view}></View>
                <Button
                    color='#990026'
                    title="Select * on DB"
                    onPress={() => select()}
                />
                <View style={styles.inter_view}></View>
                <Button
                    color='#990026'
                    title="Ajouter un vin"
                    onPress={() => this.props.navigation.navigate("WineAdd")}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inter_view: {
        height: 30
    }
})

export default Settings
