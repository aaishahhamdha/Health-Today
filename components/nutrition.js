import React, { useState, useEffect, createContext, useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useClicks } from '../context/clickContext';
import { FloatingCounter } from './floatingCounter';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated
} from 'react-native';

const NutritionItem = ({ label, value, icon, description }) => (
  <View style={styles.nutritionItem}>
    <Text style={styles.nutritionIcon}>{icon}</Text>
    <Text style={styles.nutritionLabel}>{label}</Text>
    <Text style={styles.nutritionValue}>{value}</Text>
    <Text style={styles.nutritionDescription}>{description}</Text>
  </View>
);

const NutritionModal = ({ visible, data, onClose }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!data) return null;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{data[0].name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.servingInfo}>
              <Feather name="info" size={20} color="#1E98AE" />
              <Text style={styles.servingText}>
                Serving size: {data[0].serving_size_g}g
              </Text>
            </View>

            <View style={styles.nutritionGrid}>
              <NutritionItem
                label="Calories"
                value={`${data[0].calories} kcal`}
                icon="🔥"
                description="Total energy content"
              />
              <NutritionItem
                label="Protein"
                value={`${data[0].protein_g}g`}
                icon="💪"
                description="Essential for muscle building"
              />
              <NutritionItem
                label="Carbs"
                value={`${data[0].carbohydrates_total_g}g`}
                icon="🌾"
                description="Main energy source"
              />
              <NutritionItem
                label="Fat"
                value={`${data[0].fat_total_g}g`}
                icon="🥑"
                description="Important for hormone production"
              />
              <NutritionItem
                label="Fiber"
                value={`${data[0].fiber_g}g`}
                icon="🌿"
                description="Aids digestion"
              />
              <NutritionItem
                label="Sugar"
                value={`${data[0].sugar_g}g`}
                icon="🍯"
                description="Natural and added sugars"
              />
            </View>

            <View style={styles.additionalInfo}>
              <Text style={styles.additionalInfoTitle}>Additional Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Cholesterol:</Text>
                <Text style={styles.infoValue}>{data[0].cholesterol_mg}mg</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sodium:</Text>
                <Text style={styles.infoValue}>{data[0].sodium_mg}mg</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Potassium:</Text>
                <Text style={styles.infoValue}>{data[0].potassium_mg}mg</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Saturated Fat:</Text>
                <Text style={styles.infoValue}>{data[0].fat_saturated_g}g</Text>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Nutrition Component
const Nutrition = () => {
  const [foodItem, setFoodItem] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const foodOptions = [
    { name: 'Brisket', icon: '🥩' },
    { name: 'Fries', icon: '🍟' },
    { name: 'Apple', icon: '🍎' },
    { name: 'Banana', icon: '🍌' },
    { name: 'Chicken Breast', icon: '🍗' },
    { name: 'Eggs', icon: '🥚' },
  ];

  const fetchNutritionData = async (item) => {
    if (!item) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/nutrition?query=${item}`,
        {
          headers: { 'X-Api-Key': 'YoZ4KvTe7TnWgeo/Fd0bQg==EpDGS0u1zouws9et' },
        }
      );

      if (response.data && response.data.length > 0) {
        setNutritionData(response.data);
        setModalVisible(true);
      } else {
        setError('No nutrition data available for this food item.');
      }
    } catch (err) {
      setError('Error fetching nutrition data. Please try again.');
      console.error('API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const { incrementCount } = useClicks();

  return (
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>Nutrition Information</Text>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={foodItem}
          onChangeText={setFoodItem}
          placeholder="Search for a food item"
          placeholderTextColor="#999"
          onSubmitEditing={() => fetchNutritionData(foodItem)}
        />
      </View>

      <ScrollView style={styles.foodList}>
        {foodOptions.map((food, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              incrementCount();
              setFoodItem(food.name);
              fetchNutritionData(food.name);
            }}
            style={styles.foodOption}
          >
            <Text style={styles.foodIcon}>{food.icon}</Text>
            <Text style={styles.foodOptionText}>{food.name}</Text>
            <Feather name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading nutrition data...</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <NutritionModal
        visible={modalVisible}
        data={nutritionData}
        onClose={() => setModalVisible(false)}
      />

      <FloatingCounter />
    </View>
  );
};

export default Nutrition;

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  foodList: {
    marginBottom: 20,
  },
  foodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  foodOptionText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    maxHeight: 400,
  },
  servingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  servingText: {
    fontSize: 16,
    marginLeft: 10,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  nutritionItem: {
    width: '45%',
    marginRight: '5%',
    marginBottom: 20,
  },
  nutritionIcon: {
    fontSize: 22,
    color: '#1E98AE',
  },
  nutritionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nutritionValue: {
    fontSize: 16,
    color: '#333',
  },
  nutritionDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  additionalInfo: {
    marginTop: 20,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 120,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});
