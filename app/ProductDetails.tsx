import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { subtractCoins, addProduct } from '../src/coinsSlice';

const ProductDetails = () => {
    const { product } = useLocalSearchParams();
    const parsedProduct = JSON.parse(product);
    const dispatch = useDispatch();
    const coinsBalance = useSelector((state) => state.coins.balance);

    const handleBuyProduct = () => {
        if (coinsBalance >= parsedProduct.price) {
            dispatch(subtractCoins(parsedProduct.price));
            dispatch(addProduct(parsedProduct));
            Alert.alert('Purchase Successful', 'The product has been added to your collection.');
        } else {
            Alert.alert('Insufficient Coins', 'You do not have enough coins to buy this product.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: parsedProduct.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{parsedProduct.title}</Text>
            <Text style={styles.productID}>Product ID : {parsedProduct.id}</Text>
            <Text style={styles.productPrice}>${parsedProduct.price}</Text>
            <Text style={styles.productDescription}>{parsedProduct.description}</Text>
            <TouchableOpacity onPress={handleBuyProduct} style={{ justifyContent: 'flex-end', flexGrow: 1 }}>
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