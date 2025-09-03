import { View, Text, ScrollView, Image } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { recipeDetailStyles } from '../../assets/styles/recipe-detail.styles'
// import chickenImage from '../../assets/images'

const RecipeDetailScreen = () => {

    const { id: recipeId } = useLocalSearchParams();
    const router = useRouter();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    return (
        <View style={recipeDetailStyles.container}>
            <ScrollView>
                {/* Header */}
                <View style={recipeDetailStyles.headerContainer}>
                    <View style={recipeDetailStyles.imageContainer}>
                        <Image
                            source={{ uri: recipe?.image || "../../assets/images/chicken.png" }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default RecipeDetailScreen;