import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import CategoriesCard from '../components/CategoriesCard'
import { categories } from '../constants'
import axios from 'axios'
import Loading from '../components/Loading'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import NewsSection from '../components/NewsSection'
import { newsApiKey } from '../../utils/ApiKey'

const Discover = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState("business");
    const [discovernews, setDiscovernews] = useState([]);
    const [discoverLoading, setDiscoverLoading] = useState(false);

    
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setDiscovernews([]);
    }
    useEffect(() => {
        console.log('Active category', activeCategory)
        fetchDiscoverNews(activeCategory);
    }, [activeCategory])

    const apiBaseUrl = "https://newsapi.org/v2";

    const fetchDiscoverNews = async (activeCategory) => {
        try {
            setDiscoverLoading(true);
            const res = await axios.get(`${apiBaseUrl}/top-headlines?country=in&category=${activeCategory}&apiKey=${newsApiKey}`);
            setDiscoverLoading(false);
            // console.log(res.data)
            const filteredNews = res.data.articles.filter(
                (article) => article.title !== "[Removed]"
            )
            // console.log(res.data)
            setDiscovernews(filteredNews)
        } catch (error) {
            console.log("Errr while fetching breaking news", error.message)
        }
    };

    return (
        <SafeAreaView className='pt-8 bg-white dark:bg-neutral-900 flex-1'>
            <StatusBar style={colorScheme == 'dark' ? 'light' : 'dark'} />
            <View>
                {/* header */}
                <View className='px-4 mb-6 justify-between'>
                    <Text className='text-3xl text-green-800 dark:text-white' >Discover</Text>
                    <Text className='text-base text-gray-600 dark:text-neutral-300'>News from all over the world 🌎</Text>
                </View>

                {/* search */}
                <View className='mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full'>
                    <TouchableOpacity className='pl-2'>
                        <MagnifyingGlassIcon size={25} color='gray' />
                    </TouchableOpacity>
                    <TextInput
                        onPressIn={() => navigation.navigate('Search')}
                        placeholder='Search for news'
                        placeholderTextColor={'gray'}
                        className='pl-4 flex-1 font-medium text-black tracking-wider'
                    />
                </View>

                {/* categories */}
                <View className='flex-row mx-4'>
                    <CategoriesCard
                        categories={categories}
                        activeCategory={activeCategory}
                        handleCategoryChange={handleCategoryChange}
                    />
                </View>

                <View className='h-full'>
                    {/* header title */}
                    <View className='m-4 flex-row justify-between items-center'>
                        <Text className='text-xl dark:text-white'>
                            Discover
                        </Text>
                        <Text className='text-base dark:text-neutral-300 text-green-800'>
                            View All
                        </Text>
                    </View>

                    {
                        discoverLoading ? <Loading /> : (
                            <ScrollView contentContainerStyle={{
                                paddingBottom: hp(70)
                            }}>
                                <NewsSection label="Discovery" data={discovernews} />
                            </ScrollView>
                        )
                    }
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Discover