import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import WineList from '../Components/WineList'
import WineAdd from '../Components/WineAdd'
import Settings from '../Components/Settings'

/*const WineListStackNavigator = createStackNavigator({
  WineList: {
    screen: WineList,
    navigationOptions: {
      title: 'Liste des vins'
    }
  },
  WineAdd: {
    screen: WineAdd
  }
})*/

const WineTabNavigator = createBottomTabNavigator(
  {
    WineList: {
        screen: WineList,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <View style={styles.main_container}>
                        <Image
                            source={require('../Images/wine_cellar.png')}
                            style={styles.icon}
                        />
                    </View>
                )
            }
        }
    },
    WineAdd: {
        screen: WineAdd,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <View style={styles.main_container}>
                        <Image
                            source={require('../Images/wine_add.png')}
                            style={styles.icon}
                        />
                    </View>
                )
            }
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <View style={styles.main_container}>
                        <Image
                            source={require('../Images/settings.png')}
                            style={styles.icon}
                        />
                    </View>
                )
            }
        }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#73061D',
      inactiveBackgroundColor: '#990026',
      showLabel: false,
      showIcon: true
    }
  }
)

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 25,
        height: 25
    }
})

export default createAppContainer(WineTabNavigator)
