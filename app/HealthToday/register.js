import React from "react";
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .label("Username"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email")
    .label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
    .label("Confirm Password"),
});

const Register = () => {
  const router = useRouter();

  const handleRegister = async (values) => {
    try {
      const { email, password } = values;
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.push("/Dashboard") },
      ]);
    } catch (error) {
      if (error.message=="auth/email-already-in-use"){
        Alert.alert("An account with this email already exists"); 
      }
      else
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/login-bg.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Icon name="user-circle" size={80} color="#1E98AE" style={styles.icon} />
          <Text style={styles.title}>Create an Account</Text>
        </View>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleRegister}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={[
                  styles.input,
                  touched.username && errors.username && styles.inputError,
                ]}
                placeholder="Username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError,
                ]}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password && styles.inputError,
                ]}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  touched.confirmPassword &&
                    errors.confirmPassword &&
                    styles.inputError,
                ]}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.linkContainer}
                          onPress={() => router.push('/HealthToday/login')}
                        >
                          <Text style={styles.linkText}>Have an account? <Text style={styles.linkHighlight}>Login</Text></Text>
                        </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ImageBackground>
  );
};

export default Register;

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
  textButton: {
    marginTop: 15,
    alignItems: "center",
  },
  textButtonText: {
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
