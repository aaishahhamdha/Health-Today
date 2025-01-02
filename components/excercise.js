import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useClicks } from '../context/clickContext';
import { Feather } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { FloatingCounter } from './floatingCounter';

const ExerciseItem = ({ exercise, onSelect, incrementCount }) => (
  <TouchableOpacity
    style={styles.exerciseItem}
    onPress={() => {
      onSelect(exercise);
      incrementCount();
    }}
  >
    {exercise.gifUrl ? (
      <Image
        source={{ uri: exercise.gifUrl }}
        style={styles.thumbnailImage}
        resizeMode="cover"
      />
    ) : (
      <View style={styles.placeholderThumbnail}>
        <Text style={styles.placeholderText}>No Image</Text>
      </View>
    )}
    <Text style={styles.exerciseName}>{exercise.name}</Text>
    <Feather name="chevron-right" size={20} color="#666" />
  </TouchableOpacity>
);

const ExerciseModal = ({ visible, exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{exercise.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody}>
            <Image
              source={{ uri: exercise.gifUrl }}
              style={styles.exerciseImage}
              resizeMode="contain"
            />
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Body Part: </Text>
              {exercise.bodyPart}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Target Muscle: </Text>
              {exercise.target}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Equipment: </Text>
              {exercise.equipment}
            </Text>
            <Text style={styles.boldText}>Instructions:</Text>
            {Array.isArray(exercise.instructions) &&
              exercise.instructions.map((step, index) => (
                <Text key={index} style={styles.instructionText}>
                  {index + 1}. {step}
                </Text>
              ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { incrementCount } = useClicks();

  const fetchExercises = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0',
        {
          headers: {
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
            'x-rapidapi-key': 'e5d7c12088msh67f20a907ad73a8p1a48bajsn55007b86ea7f',
          },
        }
      );
      setExercises(response.data);
    } catch (err) {
      setError('Failed to load exercises. Please try again.');
      console.error('API Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <View style={styles.pageContent}>
      <Text style={styles.pageTitle}>Exercise Library</Text>
      {loading && <Text style={styles.loadingText}>Loading exercises...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView style={styles.exerciseList}>
        {exercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onSelect={(selected) => {
              setSelectedExercise(selected);
              setModalVisible(true);
            }}
            incrementCount={incrementCount}
          />
        ))}
      </ScrollView>

      <ExerciseModal
        visible={modalVisible}
        exercise={selectedExercise}
        onClose={() => setModalVisible(false)}
      />
      <FloatingCounter />
    </View>
  );
};

export default Exercise;

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
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  exerciseList: {
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  placeholderThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
  exerciseName: {
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
  exerciseImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
