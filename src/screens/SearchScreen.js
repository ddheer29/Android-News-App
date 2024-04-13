import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { debounce } from 'lodash'
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';
import axios from 'axios';
import {newsApiKey} from  '../../utils/ApiKey';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // console.log("Search", results);
    const apiBaseUrl = "https://newsapi.org/v2";


    const handleSearch = async (query) => {
        if (query && query.length > 2) {
            setLoading(true);
            setResults([]);
            setSearchTerm(query);
            try {
                const res = await axios.get(`${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}`)
                setLoading(false);
                if (res.data && res.data.articles) {
                    setResults(res.data.articles);
                }
            } catch (error) {
                console.log("Error searching news: ", error);
            }
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <View className='flex-1 bg-white dark:bg-neutral-900'>
            <View className='mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg'>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search for your news'
                    placeholderTextColor={'gray'}
                    className='font-medium text-black tracking-wider p-3 py-1 w-[90%]'
                />
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <XMarkIcon size={25} color={'green'} strokeWidth={3} />
                </TouchableOpacity>
            </View>

            <View className='mx-4 mb-4'>
                <Text className='text-xl dark:text-white'>{results.length} News for {searchTerm}</Text>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: hp(5),
                }}
            >
                <NewsSection label="Search Results" data={results} />
            </ScrollView>
        </View>
    )
}

export default SearchScreen