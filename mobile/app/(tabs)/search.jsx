import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {searchStyles} from '../../assets/styles/search.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { useDebounce } from '../../hooks/useDebounce';
import LoadingSpinner from '@/components/LoadingSpinner';
import RecipeCard from '@/components/RecipeCard';
import { MealAPI } from '@/services/mealApi';

const search = () => {

  const [searchQuery,setSearchQuery] = useState("");
  const [recipes,setRecipes] = useState([]);
  const [loading,setLoading] = useState(false);
  const [initialLoading,setIntialLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery,300);

  const performSearch = async (query) =>{
    if(!query.trim()){
      const randomMeals = await MealAPI.getRandomMeals(12);
      return randomMeals
          .map((meal)=> MealAPI.transformMealData(meal))
          .filter((meal)=> meal !== null);
    }


    const nameResult = await MealAPI.searchMealByName(query);
    let results = nameResult;

    if(results.length == 0){
      const ingredientsResult = await MealAPI.filterByIngridents(query)
      results = ingredientsResult
    }

    return results.slice(0,12).map((meal)=>MealAPI.transformMealData(meal)).filter((meal)=>meal!== null);
  }

  useEffect(()=>{
    const loadIntitalData = async () =>{
      try{
        const results = await performSearch("")
        setRecipes(results)
      }catch(er){
        console.log(er)
      }finally{
        setIntialLoading(false);
      }
    }

    loadIntitalData()
  },[])

   useEffect(() => {
    if (initialLoading) return;

    const handleSearch = async () => {
      setLoading(true);

      try {
        const results = await performSearch(debouncedSearchQuery);
        setRecipes(results);
      } catch (error) {
        console.error("Error searching:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [debouncedSearchQuery, initialLoading]);

  if (initialLoading) return <LoadingSpinner message="Loading recipes..." />;

  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name='search'          
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput 
            style={searchStyles.searchInput}
            placeholder='Search recipes, ingredients'
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType='search'
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={()=>setSearchQuery("")} style={searchStyles.clearButton}>
              <Ionicons name='close-circle' size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>      
      </View>

      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsHeader}>
          <Text style={searchStyles.resultsTitle}>
            {searchQuery ? `Result for "${searchQuery}"`:`Popular Recipe`}
          </Text>
          <Text style={searchStyles.resultsCount}>{recipes.length} found</Text>
        </View>
        {
          loading ? (
            <View style={searchStyles.loadingContainer}>
              <LoadingSpinner message='Searching recipes...' size='small' />
            </View>
          ) : (
            <FlatList
              data={recipes}
              renderItem={({item}) => <RecipeCard recipe={item} />}
              keyExtractor={(item) => item?.id.toString() }
              numColumns={2}
              columnWrapperStyle={searchStyles.row}
              contentContainerStyle={searchStyles.recipesGrid}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<NoResultFound />}
            />
          )
        }
      </View>      
    </View>
  )
}

export default search

function NoResultFound(){
  return(
     <View style={searchStyles.emptyState}>
      <Ionicons name="search-outline" size={64} color={COLORS.textLight} />
      <Text style={searchStyles.emptyTitle}>No recipes found</Text>
      <Text style={searchStyles.emptyDescription}>
        Try adjusting your search or try different keywords
      </Text>
    </View>
  )
}