import { Stack } from "expo-router";
import { UserProvider } from "../context/userContext";
import { ClickProvider } from "../context/clickContext";

export default function RootLayout(){
    return (
        <ClickProvider>
        <UserProvider>
    <Stack>
        <Stack.Screen name='index' options={{headerShow: false, title:"Home"}}/>
    </Stack>
    </UserProvider>
    </ClickProvider>
    )
}