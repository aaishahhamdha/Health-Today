import { useClicks } from "../context/clickContext";
import { StyleSheet, Text, View } from 'react-native';

export const FloatingCounter = () => {
  const { clickCount } = useClicks();
  
  return (
    <View style={styles.floatingButton}>
      <Text style={styles.countText}>{clickCount}</Text>
      <Text style={styles.labelText}>Clicks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    backgroundColor: '#1E98AE',
    width: 62,
    height: 62,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  labelText: {
    color: '#fff',
    fontSize: 12,
  },
});
