import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind';
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"

const Header = () => {
    const navigation = useNavigation();
    const { colorScheme, toggleColorScheme } = useColorScheme();


    return (
        <View className='flex-row justify-between items-center mx-4 mt-4'>
            <View>
                <Text
                    className='text-2xl text-green-800 dark:text-white uppercase'
                >
                    Stack News
                </Text>
            </View>
            <View className='flex-row space-x-4 rounded-full justify-center items-center'>
                <Switch value={colorScheme == 'dark'} onChange={toggleColorScheme} />
                <TouchableOpacity className='bg-gray-200 dark:bg-green-800 rounded-full p-2' onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size={25} strokeWidth={2} color={colorScheme == 'dark' ? 'white' : 'green'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})