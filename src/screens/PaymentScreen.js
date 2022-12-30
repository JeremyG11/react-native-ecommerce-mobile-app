import { CardField, useStripe } from '@stripe/stripe-react-native';
import { View } from 'react-native'
const PaymentScreen = () => {
    const API_URL = 'pk_test_51MKMKvFFjUyheLLVZzoxImHRGfvAlZEBHzqGEXBOsgfHCTQrjocOEENXTekseSARA7b2DIxPyZ0zZq2nCKYBEMMC00BZMtbWM4'
    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
            }),
        });
        const { clientSecret } = await response.json();
        console.log(response)
        return clientSecret;
    };

    const handlePayPress = async () => {
        if (!card) {
            return;
        }

        // Fetch the intent client secret from the backend.
        const clientSecret = await fetchPaymentIntentClientSecret();
    };


    return (
        <View>
            <CardForm>

                <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#18a',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 200,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                />
            </CardForm>
        </View>
    );
}

export default PaymentScreen