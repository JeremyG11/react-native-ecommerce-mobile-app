
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import Details from "../../screens/Details";
import Cart from "../../screens/cart/Cart";
import PaymentSheet from "../../screens/cart/PaymentSheet";
const Stack = createStackNavigator();

const StackNavigator = () => {


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Payment" component={PaymentSheet} />
        </Stack.Navigator>
    );
}
export default StackNavigator