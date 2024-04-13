import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MiniHeader from '../components/MiniHeader';
import BreakingNews from '../components/BreakingNews';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';
import axios from "axios";
import { newsApiKey } from '../../utils/ApiKey';

const Home = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    const [breakingNews, setBreakingNews] = useState([]);
    const [recommendedNews, setRecommendedNews] = useState([]);
    const [breakingNewsLoading, setbreakingNewsLoading] = useState(false);
    const [recommendedNewsLoading, setrecommendedNewsLoading] = useState(false);


    const apiBaseUrl = "https://newsapi.org/v2";

    const fetchBreakingNews = async () => {
        try {
            setbreakingNewsLoading(true);
            const res = await axios.get(`${apiBaseUrl}/top-headlines?country=us&apiKey=${newsApiKey}`)
            setbreakingNewsLoading(false);
            // console.log(res.data)
            setBreakingNews(res.data.articles)
        } catch (error) {
            console.log("Errr while fetching breaking news", error.message)
        }
    };

    const fetchRecommendedNews = async () => {
        try {
            setrecommendedNewsLoading(true);
            const res = await axios.get(`${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newsApiKey}`)
            setrecommendedNewsLoading(false);
            // console.log(res.data.articles)
            setRecommendedNews(res.data.articles)
        } catch (error) {
            console.log("Errr while fetching recommended news", error.message)
        }
    };
    useEffect(() => {
        fetchBreakingNews();
        fetchRecommendedNews();
    }, [])

    return (
        <SafeAreaView>
            <StatusBar style={colorScheme == 'dark' ? 'light' : 'dark'} />
            <Header />
            {
                breakingNewsLoading ? (
                    <Loading />
                ) : (
                    <View>
                        <MiniHeader label='Breaking News' />
                        <BreakingNews label='Breaking News' data={breakingNews} />
                    </View>
                )
            }
            <View>
                <MiniHeader label='Recommended News' />
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: hp(80),
                    }}
                >
                    {
                        recommendedNewsLoading ? (
                            <Loading />
                        ) : (
                            <NewsSection label='Recommendation' data={recommendedNews} />
                        )
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home