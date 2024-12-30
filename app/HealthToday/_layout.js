import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="login" 
        options={{
          title: "Login"
        }}
      />
         <Stack.Screen 
        name="register" 
        options={{
          title: "Register"
        }}
      />
    </Stack>
  );
}