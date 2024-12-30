import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required').label('Email'),
  password: Yup.string().required('Password is required').label('Password'),
});

const Login = () => {
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      

      Alert.alert("Success", "Login successful", [
        { text: "OK", onPress: () => router.push('/Dashboard') }
      ]);
      
    } catch (error) {
      console.error("Login error", error);
      let errorMessage = "Login error";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "User does not exist";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid credentials";
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <ImageBackground source={require("../../assets/login-bg.png")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Icon name="account-lock-outline" size={80} color="#1E98AE" style={styles.icon} />
          <Text style={styles.title}>Login to your account</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={[styles.input, touched.email && errors.email && styles.inputError]}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={[styles.input, touched.password && errors.password && styles.inputError]}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkContainer}
                onPress={() => router.push('/HealthToday/register')}
              >
                <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Get Started</Text></Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E98AE",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#1E98AE",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#666",
  },
  linkHighlight: {
    color: "#1E98AE",
    fontWeight: "bold",
  },
    linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#666",
  },
  linkHighlight: {
    color: "#1E98AE",
    fontWeight: "bold",
  },
});
