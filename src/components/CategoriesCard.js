import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const CategoriesCard = ({ categories, activeCategory, handleCategoryChange }) => {

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='space-x-4'
                contentContainerStyle={{
                    paddingRight: 20,
                }}
            >
                {
                    categories.map((category, index) => {
                        let isActive = category.title === activeCategory
                        let activeButtonClass = isActive ? "bg-green-700" : "bg-black/10 dark:bg-neutral-600"
                        let activeTextClass = isActive ? "text-white" : "text-gray-600 dark:text-neutral-600"
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleCategoryChange(category.title)}
                                className='flex items-center space-y-1'
                            >
                                <View className={`rounded-full py-2 px-4 ${activeButtonClass}`}>
                                    <Text className={`capitalize ${activeTextClass} dark:text-white`} style={{ fontSize: hp(1.6) }}>
                                        {category.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default CategoriesCard