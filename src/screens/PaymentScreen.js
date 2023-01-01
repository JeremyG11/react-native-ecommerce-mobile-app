import { useState, useEffect } from 'react'
import { usePaymentSheet } from '@stripe/stripe-react-native';
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { Button, Alert, View, } from 'react-native'
import { API_URL } from "../config/config";

const PaymentScreen = () => {
    const [ready, setReady] = useState(false)
    const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();


    useEffect(() => {
        initializePaymentSheet()
    }, [])
    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/api/payment/product/checkout/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Baro collections, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jeremy T. Nguth',
            }
        });
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
        } else {
            setReady(true)
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View>
            <Button
                variant="primary"
                disabled={loading || !ready}
                title="Checkout"
                onPress={openPaymentSheet}
            />
        </View>
    );
}

export default PaymentScreen