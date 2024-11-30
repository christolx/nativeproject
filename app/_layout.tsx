import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/store';
import { Stack } from 'expo-router';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Stack>
                    <Stack.Screen name="index" options={{ title: 'Home' }} />
                    <Stack.Screen name="ProductDetails" options={{ title: 'Product Details' }} />
                    <Stack.Screen name="MyProducts" options={{ title: 'My Products' }} />
                    <Stack.Screen name="Minigame" options={{ title: 'Minigame' }} />
                </Stack>
            </PersistGate>
        </Provider>
    );
};

export default App;