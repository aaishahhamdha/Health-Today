import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Home = () => {
    const router = useRouter();
    return (
        <View style={styles.wrapper}>
            <ImageBackground
                source={require('../assets/health-bg.png')}
                style={styles.backgroundImage}
                blurRadius={5}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']}
                    style={styles.gradientOverlay}
                >
                    <View style={styles.mainContent}>
                        <View style={styles.logoWrapper}>
                            <Text style={styles.mainText}>Health</Text>
                            <Text style={styles.logoTitle}>
                                T
                                <MaterialCommunityIcons name="heart" size={70} color="#8CD4E0" />
                                DAY
                            </Text>
                        </View>

                        <Text style={styles.subtitle}>Stay Informed, Stay Healthy</Text>

                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={() => { router.push("/HealthToday/register"); }}
                            >
                                <LinearGradient
                                    colors={['#FFFFFF', '#DDDDDD']}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.primaryButtonText}>Get Started</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => { router.push("/HealthToday/login"); }}
                            >
                                <Text style={styles.secondaryButtonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
        resizeMode: 'cover',
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logoWrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },
    mainText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'serif',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    logoTitle: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        fontFamily: 'sans-serif',
        marginTop: -5,
    },
    subtitle: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 50,
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 26,
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    primaryButton: {
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    gradientButton: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
    },
    primaryButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
    },
    secondaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Home;
