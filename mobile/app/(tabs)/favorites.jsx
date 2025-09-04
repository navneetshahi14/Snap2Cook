import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {API_URL} from '../../constants/api';
import {LoadingSpinner} from '../../components/LoadingSpinner';
import { favoritesStyles } from '../../assets/styles/favorites.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import RecipeCard from '@/components/RecipeCard';
import NoFavoritesFound from '@/components/NoFavoritesFound';
import { useRouter } from 'expo-router';
// import * as SecureStore from 'expo-secure-store';

const favorites = () => {

  const router = useRouter()
  
  const TokenGet = async () => {
    const token = await SecureStore.getItemAsync("token");
    return token;
  }

  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadFavorites = async () => {
      const token = await TokenGet();

      try {
        const response = await fetch(`${API_URL}/api/favorites/`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        })

        if(!response.ok) throw new Error("Failed to fetch favorites");

        const favorites = await response.json();

        const transformedFavorites = favorites.map((favorite)=>({
          ...favorites,
          id: favorite.recipeId
        }));

        setFavoriteRecipe(transformedFavorites);

        
      } catch (err) {

        console.log("Error loading Favorites")
        Alert.alert("Error","Failed to load favorites")
      } finally {

        setLoading(false);

      }
    }

    loadFavorites()
  }, [])

  const handleSignOut = () =>{
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: signOut },
    ])
  }

  const signOut = async () =>{
    await SecureStore.deleteItemAsync("token")
    router.push("/(auth)")
  }

  // if(loading) return <LoadingSpinner message="Loading your favorites..." />;

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title} >Favorites</Text>
          <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons name='log-out-outline' size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favoriteRecipe}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default favorites