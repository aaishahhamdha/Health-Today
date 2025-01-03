import React, { useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import Nutrition from "../../components/nutrition";
import News from "../../components/news";
import Exercise from "../../components/excercise";
import { UserContext } from "../../context/userContext";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("exercise");
  const { username } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      Alert.alert("Success", "You have been logged out.");
      router.push("/HealthToday/login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.containerOnAll}>
      <View style={styles.headerSectionOnAll}>
        <View style={styles.largeGleamingCircleOnAll} />
        <View style={styles.smallGleamingCircleOnAll} />
        <View style={styles.extraSmallGleamingCircleOnAll} />
        <View style={styles.headerTitleSectionOnAll}>
          <Image
            source={require("../../assets/health_image.png")}
            style={styles.profileImageOnAll}
          />
          <View style={styles.headerContentOnAll}>
            <View style={styles.headerTitleSectionOnAll}>
              <Text style={styles.headerTitleOnAll}>Hi {username},</Text>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonOnAll}>
                <Feather name="log-out" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerSubtitleOnAll}>Welcome to Health Today</Text>
          </View>
        </View>
      </View>

      <View style={styles.navigationBarOnAll}>
      <TouchableOpacity
          style={[
            styles.navButtonOnAll,
            selectedPage === "exercise" && styles.navButtonActiveOnAll,
          ]}
          onPress={() => setSelectedPage("exercise")}
        >
          <Feather
            name="activity"
            size={24}
            color={selectedPage === "exercise" ? "#1E98AE" : "#666"}
          />
          <Text
            style={[
              styles.navButtonTextOnAll,
              selectedPage === "exercise" && styles.navButtonActiveOnAll,
            ]}
          >
            Exercise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButtonOnAll,
            selectedPage === "nutrition" && styles.navButtonActiveOnAll,
          ]}
          onPress={() => setSelectedPage("nutrition")}
        >
          <Feather
            name="pie-chart"
            size={24}
            color={selectedPage === "nutrition" ? "#1E98AE" : "#666"}
          />
          <Text
            style={[
              styles.navButtonTextOnAll,
              selectedPage === "nutrition" && styles.navButtonTextActiveOnAll,
            ]}
          >
            Nutrition
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButtonOnAll,
            selectedPage === "news" && styles.navButtonActiveOnAll,
          ]}
          onPress={() => setSelectedPage("news")}
        >
          <Feather
            name="globe"
            size={24}
            color={selectedPage === "news" ? "#1E98AE" : "#666"}
          />
          <Text
            style={[
              styles.navButtonTextOnAll,
              selectedPage === "news" && styles.navButtonTextActiveOnAll,
            ]}
          >
            News
          </Text>
        </TouchableOpacity>

      
      </View>

      {selectedPage === "nutrition" && <Nutrition />}
      {selectedPage === "news" && <News />}
      {selectedPage === "exercise" && <Exercise />}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containerOnAll: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerSectionOnAll: {
    position: "relative",
    backgroundColor: "#1E98AE",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  largeGleamingCircleOnAll: {
    position: "absolute",
    top: -30,
    right: -40,
    width: 150,
    height: 150,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 75,
  },
  smallGleamingCircleOnAll: {
    position: "absolute",
    bottom: -20,
    left: -20,
    width: 100,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 50,
  },
  extraSmallGleamingCircleOnAll: {
    position: "absolute",
    top: 50,
    right: 150,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
  },
  headerTitleSectionOnAll: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageOnAll: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    opacity: 0.9,
  },
  headerContentOnAll: {
    flex: 1,
  },
  headerTitleOnAll: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitleOnAll: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginTop: 8,
  },
  logoutButtonOnAll: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  navigationBarOnAll: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 3,
  },
  navButtonOnAll: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  navButtonActiveOnAll: {
    backgroundColor: "#E8F8FA",
  },
  navButtonTextOnAll: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
  navButtonTextActiveOnAll: {
    color: "#1E98AE",
    fontWeight: "600",
  },
});
