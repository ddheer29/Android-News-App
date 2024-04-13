import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'nativewind'
import Home from '../screens/Home'
import Discover from '../screens/Discover'
import SavedScreen from '../screens/SavedScreen'
import SearchScreen from '../screens/SearchScreen'
import SplashScreens from '../screens/SplashScreens'
import WelcomeScreen from '../screens/WelcomeScreen'
import NewsDetails from '../screens/NewsDetails'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const TabNavigator = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Discover") {
                            iconName = "compass-outline";
                        } else if (route.name === "Saved") {
                            iconName = "bookmark-outline";
                        } else if (route.name === "Search") {
                            iconName = "search-outline";
                        }

                        const customizeSize = 25;
                        return (
                            <Ionicons
                                name={iconName}
                                size={customizeSize}
                                // style={{color: 'green'}}
                                color={focused ? "green" : "gray"}
                            />
                        )
                    },
                    tabBarActiveTintColor: "green",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        // paddingBottom: 10,
                    },
                    tabBarStyle: {
                        backgroundColor: colorScheme == "dark" ? "black" : "white",
                        // borderTopWidth: 0,
                        // padding: 10,
                        // height: 60,
                    },
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Discover" component={Discover} />
                <Tab.Screen name="Saved" component={SavedScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Discover' screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='Home' component={TabNavigator} />
                <Stack.Screen name='Splashs' component={SplashScreens} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Search' component={SearchScreen} />
                <Stack.Screen name='NewsDetails' component={NewsDetails}
                    options={{
                        animation: 'slide_from_bottom'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation