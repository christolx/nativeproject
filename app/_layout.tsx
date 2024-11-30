import { Stack } from 'expo-router';

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="ProductDetails" options={{ title: 'Product Details' }} />
      </Stack>
  );
};

export default Layout;