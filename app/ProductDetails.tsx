import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams

const ProductDetails = () => {
    const { product } = useLocalSearchParams(); // Get the product data passed from HomePage
    const parsedProduct = JSON.parse(product); // Parse the product string back to an object

    return (
        <View style={styles.container}>
            <Image source={{ uri: parsedProduct.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{parsedProduct.title}</Text>
            <Text style={styles.productID}>Product ID : {parsedProduct.id}</Text>
            <Text style={styles.productPrice}>${parsedProduct.price}</Text>
            <Text style={styles.productDescription}>{parsedProduct.description}</Text>
            <TouchableOpacity style={{justifyContent:'flex-end' ,flexGrow:1}}>
                <Text style={styles.btn}>Buy</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productID: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10
    },
    productPrice: {
        fontSize: 20,
        color: '#888',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#333',
    },
    btn: {
        fontSize : 30,
        backgroundColor : '#8775a9',
        textAlign: 'center',
        color : 'white',
        borderRadius : 10
    }
});

export default ProductDetails;