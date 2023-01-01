
import ProductState from "./src/context/product/ProductState";
import TabNavigator from './src/components/navigators/TabNavigator';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";

import { API_URL } from "./src/config/config";
import { Button, Alert, View } from 'react-native'

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
    // InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });


  const [ready, setReady] = useState(false)
  const { initPaymentSheet } = useStripe();



  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${API_URL}/payment-sheet`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   console.log(response.json())
  //   const { paymentIntent, ephemeralKey, customer } = await response.json();
  //   console.log(ephemeralKey, paymentIntent, customer)
  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // }

  // const initializePaymentSheet = async () => {
  //   const {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   } = await fetchPaymentSheetParams();

  //   const { error } = await initPaymentSheet({
  //     merchantDisplayName: "Example Inc.",
  //     customerId: customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     paymentIntentClientSecret: paymentIntent,
  //     allowsDelayedPaymentMethods: true,
  //     defaultBillingDetails: {
  //       name: 'Jeremy T. Nguth',
  //     }
  //   });
  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message)
  //   } else {
  //     setReady(true)
  //   }
  // };

  // useEffect(() => {
  //   initializePaymentSheet()
  //   console.log("Rennderinggm", initializePaymentSheet())
  // }, [])




  return (
    <StripeProvider
      publishableKey='pk_test_51MKMKvFFjUyheLLVZzoxImHRGfvAlZEBHzqGEXBOsgfHCTQrjocOEENXTekseSARA7b2DIxPyZ0zZq2nCKYBEMMC00BZMtbWM4'
    >
      <NavigationContainer>
        <ProductState>
          <TabNavigator />
        </ProductState>
      </NavigationContainer>
    </StripeProvider>
  );
}
export default App
