import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BookmarkSquareIcon } from "react-native-heroicons/solid"
import AsyncStorage from "@react-native-async-storage/async-storage"

const NewsSection = ({ label, data }) => {
    const navigation = useNavigation();
    const [urlList, setUrlList] = useState([]);
    const [bookmarkStatus, setBookmarkStatus] = useState([]);

    function formatDate(pdate) {
        const options = {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
        const date = new Date(pdate);
        return date.toLocaleDateString(undefined, options);
    }

    const toggleBookmarkAndSave = async (item, index) => {
        try {
            const savedArticles = await AsyncStorage.getItem("savedArticles");
            let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

            // Check if the article is already in the bookmarked list
            const isArticleBookmarked = savedArticlesArray.some(
                (savedArticle) => savedArticle.url === item.url
            );

            if (!isArticleBookmarked) {
                // If the article is not bookmarked, add it to the bookmarked list
                savedArticlesArray.push(item);
                await AsyncStorage.setItem(
                    "savedArticles",
                    JSON.stringify(savedArticlesArray)
                );
                const updatedStatus = [...bookmarkStatus];
                updatedStatus[index] = true;
                setBookmarkStatus(updatedStatus);
            } else {
                // If the article is already bookmarked, remove it from the list
                const updatedSavedArticlesArray = savedArticlesArray.filter(
                    (savedArticle) => savedArticle.url !== item.url
                );
                await AsyncStorage.setItem(
                    "savedArticles",
                    JSON.stringify(updatedSavedArticlesArray)
                );
                const updatedStatus = [...bookmarkStatus];
                updatedStatus[index] = false;
                setBookmarkStatus(updatedStatus);
            }
        } catch (error) {
            console.log("Error Saving/Removing Article", error);
        }
    };

    const handleClick = (item) => {
        navigation.navigate('NewsDetails', item)
    }

    useEffect(() => {
        const urls = data.map((item) => item.url);
        setUrlList(urls);
    }, [data]);

    useFocusEffect(
        useCallback(() => {
            const loadSavedArticles = async () => {
                try {
                    const savedArticles = await AsyncStorage.getItem("savedArticles");
                    const savedArticlesArray = savedArticles
                        ? JSON.parse(savedArticles)
                        : [];

                    // Check if each URL in 'urlList' exists in the bookmarked list
                    const isArticleBookmarkedList = urlList.map((url) =>
                        savedArticlesArray.some((savedArticle) => savedArticle.url === url)
                    );

                    // Set the bookmark status for all items based on the loaded data
                    setBookmarkStatus(isArticleBookmarkedList);
                } catch (error) {
                    console.log("Error Loading Saved Articles", error);
                }
            }
            loadSavedArticles();
        }, [navigation, urlList])
    )

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                className="mb-4 mx-4 space-y-1"
                key={index}
                onPress={() => handleClick(item)}
            >
                <View className="flex-row justify-start w-[100%]shadow-sm">
                    {/* Image */}
                    <View className="items-start justify-start w-[20%]">
                        <Image
                            source={{
                                uri:
                                    item.urlToImage ||
                                    "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                            }}
                            style={{ width: hp(10), height: hp(10) }}
                            resizeMode="cover"
                            className="rounded-lg"
                        />
                    </View>

                    {/* Content */}

                    <View className="w-[70%] pl-5 justify-center space-y-1">
                        {/* Author */}
                        <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
                            {item?.author?.length > 20
                                ? item.author.slice(0, 20) + "..."
                                : item.author}
                        </Text>

                        {/* Title */}
                        <Text
                            className="text-neutral-800 capitalize max-w-[90%] dark:text-white "
                            style={{
                                fontSize: hp(1.7),
                            }}
                        >
                            {item.title.length > 50
                                ? item.title.slice(0, 50) + "..."
                                : item.title}
                        </Text>

                        {/* Date */}
                        <Text className="text-xs text-gray-700 dark:text-neutral-300">
                            {formatDate(item.publishedAt)}
                        </Text>
                    </View>

                    {/* Bookmark */}
                    <View className="w-[10%] justify-center">
                        <TouchableOpacity
                            onPress={() => toggleBookmarkAndSave(item, index)}
                        >
                            <BookmarkSquareIcon
                                color={bookmarkStatus[index] ? "green" : "gray"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View className='space-y-2 bg-white dark:bg-neutral-900'>
            <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

export default NewsSection

const styles = StyleSheet.create({})