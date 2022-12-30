
import ProductState from "./src/context/product/ProductState";
import TabNavigator from './src/components/navigators/TabNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <>
      <NavigationContainer>
        <StripeProvider
          publishableKey="pk_test_51MKMKvFFjUyheLLVZzoxImHRGfvAlZEBHzqGEXBOsgfHCTQrjocOEENXTekseSARA7b2DIxPyZ0zZq2nCKYBEMMC00BZMtbWM4"
          merchantIdentifier=""
          urlScheme="your-url-scheme"
        >
          <ProductState>
            <TabNavigator />
          </ProductState>
        </StripeProvider>
      </NavigationContainer>
    </>
  );
}
export default App
