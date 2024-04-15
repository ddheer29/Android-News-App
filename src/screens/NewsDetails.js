
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { BookmarkSquareIcon, ChevronLeftIcon, ShareIcon } from 'react-native-heroicons/outline';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

const { width, height } = Dimensions.get('window')

const NewsDetails = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [isBookMarked, setIsBookMarked] = useState(false);

    const toggleBookmarkAndSave = async () => {
        try {
            const savedArticles = await AsyncStorage.getItem("savedArticles");
            let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
            const isArticleBookmarked = savedArticlesArray.some(
                (savedArticle) => savedArticle.url === item.url
            );
            if (!isArticleBookmarked) {
                savedArticlesArray.push(item);
                await AsyncStorage.setItem(
                    "savedArticles",
                    JSON.stringify(savedArticlesArray)
                );
                setIsBookMarked(true);
            } else {
                const updatedSavedArticlesArray = savedArticlesArray.filter(
                    (savedArticle) => savedArticle.url !== item.url
                );
                await AsyncStorage.setItem(
                    "savedArticles",
                    JSON.stringify(updatedSavedArticlesArray)
                );
                setIsBookMarked(false);
            }
        } catch (error) {
            console.log("Error Saving/Removing Article", error);
        }
    };


    useEffect(() => {
        const loadSavedArticles = async () => {
            try {
                const savedArticles = await AsyncStorage.getItem("savedArticles");
                const savedArticlesArray = savedArticles
                    ? JSON.parse(savedArticles)
                    : [];

                const isArticleBookmarkedList = savedArticlesArray.some((savedArticle) => savedArticle.url === item.url);
                setIsBookMarked(isArticleBookmarkedList);
            } catch (error) {
                console.log("Error Loading Saved Articles", error);
            }
        }
        loadSavedArticles();
    }, [item.url])

    return (
        <>
            <View className='w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white'>
                <StatusBar style={colorScheme == 'dark' ? 'light' : 'dark'} />
                <View className='bg-gray-100 p-2 rounded-full items-center justify-center'>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeftIcon size={25} color='gray' strokeWidth={3} />
                    </TouchableOpacity>
                </View>
                <View className='space-x-3 rounded-full items-center justify-center flex-row bg-white'>
                    <TouchableOpacity
                        className='bg-gray-100 p-2 rounded-full'
                    >
                        <ShareIcon color='gray' size={25} strokeWidth={3} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className='bg-gray-100 p-2 rounded-full'
                        onPress={toggleBookmarkAndSave}
                    >
                        <BookmarkSquareIcon color={isBookMarked ? 'green' : 'gray'} size={25} strokeWidth={3} />
                    </TouchableOpacity>
                </View>
            </View>

            <WebView
                source={{
                    uri: item.url
                }}
                onLoadStart={() => setVisible(true)}
                onLoadEnd={() => setVisible(false)}
            />
            {
                visible && (
                    <ActivityIndicator
                        size={'large'}
                        color={'green'}
                        style={{
                            position: 'absolute',
                            top: height / 2,
                            left: width / 2.3,
                        }}
                    />
                )
            }
        </>
    )
}

export default NewsDetails