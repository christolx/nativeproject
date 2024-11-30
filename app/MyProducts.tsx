import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const MyProducts = () => {
    const ownedProducts = useSelector((state) => state.coins.ownedProducts);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Products</Text>
            <FlatList
                data={ownedProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productTitle}>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productTitle: {
        fontSize: 16,
    },
});

export default MyProducts;
