import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import BreakingNewsCard from './BreakingNewsCard';
import Carousal from "react-native-snap-carousel";

var { width } = Dimensions.get('window');

const BreakingNews = ({ label, data }) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate("NewsDetails", item);
    }
    return (
        <View>
            <Carousal
                data={data}
                renderItem={({ item }) => (
                    <BreakingNewsCard item={item} handleClick={handleClick} />
                )}
                firstItem={1}
                inactiveSlideScale={0.86}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.8}
                slideStyle={{ display: "flex", alignItems: "center" }}
            />
        </View>
    )
}

export default BreakingNews

const styles = StyleSheet.create({})