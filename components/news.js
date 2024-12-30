import React, { useState, useEffect,createContext, useContext  } from 'react';
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
  Linking
} from 'react-native';

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const { incrementCount } = useClicks();
  
    useEffect(() => {
      fetchNewsData(page);
    }, [page]);
  
    const fetchNewsData = async (pageNumber) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://health-news-api.vercel.app/api/srilanka/health/news?page=${pageNumber}&limit=4`
        );
        
        if (response.data.length < 4) {
          setHasNextPage(false);
        }
        
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news data', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>Latest Health News</Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading news...</Text>
          </View>
        ) : (
          <ScrollView style={styles.newsContainer}>
            {newsData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  incrementCount();
                  Linking.openURL(item.link);
                }}
              >
                <View style={styles.newsCard}>
                  <View style={styles.newsHeader}>
                    <Feather name="file-text" size={20} color="#1E98AE" />
                    <Text style={styles.newsSource}>{item.source}</Text>
                  </View>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>
                    {item.description || 'No description available'}
                  </Text>
                  <View style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>Read more</Text>
                    <Feather name="external-link" size={16} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
  
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={[styles.paginationButton, page === 1 && styles.paginationButtonDisabled]}
          >
            <Feather name="chevron-left" size={20} color={page === 1 ? "#ccc" : "#1E98AE"} />
            <Text style={[styles.paginationText, page === 1 && styles.paginationTextDisabled]}>
              Prev
            </Text>
          </TouchableOpacity>
  
          <Text style={styles.pageNumber}>Page {page}</Text>
  
          <TouchableOpacity
            onPress={() => setPage(p => p + 1)}
            disabled={!hasNextPage}
            style={[styles.paginationButton, !hasNextPage && styles.paginationButtonDisabled]}
          >
            <Text style={[styles.paginationText, !hasNextPage && styles.paginationTextDisabled]}>
              Next
            </Text>
            <Feather name="chevron-right" size={20} color={!hasNextPage ? "#ccc" : "#1E98AE"} />
          </TouchableOpacity>
        </View>
  
        <FloatingCounter />
      </View>
    );
  };

export default News;
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
    newsCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    newsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    newsSource: {
      fontSize: 14,
      color: '#666',
      marginLeft: 8,
    },
    newsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    newsDescription: {
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
      marginBottom: 15,
    },
    readMoreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1E98AE',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    readMoreText: {
      color: '#fff',
      fontWeight: '600',
      marginRight: 8,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    paginationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
    },
    paginationButtonDisabled: {
      backgroundColor: '#f0f0f0',
    },
    paginationText: {
      fontSize: 16,
      color: '#1E98AE',
      fontWeight: '600',
      marginHorizontal: 5,
    },
    paginationTextDisabled: {
      color: '#ccc',
    },
    pageNumber: {
      fontSize: 16,
      color: '#666',
      fontWeight: '500',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    loadingText: {
      fontSize: 16,
      color: '#666',
      marginTop: 10,
    },
    errorText: {
      color: '#ff4444',
      fontSize: 16,
      textAlign: 'center',
      padding: 20,
      backgroundColor: '#ffe5e5',
      borderRadius: 8,
      marginVertical: 10,
    }
  });