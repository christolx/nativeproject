import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useRouter} from 'expo-router';

const MyProducts = () => {
    const ownedProducts = useSelector((state) => state.coins.ownedProducts);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Products</Text>
            <FlatList
                data={ownedProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.productItem}
                        onPress={() => router.push({
                            pathname: 'ProductDetails',
                            params: {product: JSON.stringify(item)}
                        })}
                    >
                        <Image source={{uri: item.image}} style={styles.productImage}/>
                        <Text style={styles.productTitle}>{item.title}</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productTitle: {
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default MyProducts;
