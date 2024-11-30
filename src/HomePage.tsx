import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image,} from 'react-native';
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {useSelector, useDispatch} from 'react-redux';
import {addCoins, resetCoins, subtractCoins} from '../src/coinsSlice';
import SearchIcon from "@/assets/SearchIcon";

const HomePage = () => {

    const dispatch = useDispatch();
    const coinsBalance = useSelector((state) => state.coins.balance);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isGridView, setIsGridView] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const toggleView = () => setIsGridView(!isGridView);

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={[styles.itemContainer, isGridView && styles.gridItem]}
            onPress={() => router.push({
                pathname: 'ProductDetails',
                params: {product: JSON.stringify(item)}
            })}
        >
            <Image source={{uri: item.image}} style={styles.productImage}/>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productID}>Product ID : {item.id}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <SearchIcon style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search Product..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={styles.searchInput}
                    />
                </View>
                <TouchableOpacity
                    style={styles.myProductsButton}
                    onPress={() => router.push('MyProducts')}
                >
                    <Text style={styles.myProductsButtonText}>My Products</Text>
                </TouchableOpacity>

                <View style={styles.coinBalance}>
                    <Text style={styles.coinText}>{coinsBalance}</Text>
                    <FontAwesome5 name="money-bill" size={16} color="gold" />
                </View>
            </View>

            {/* tombol reset coins */}
            <TouchableOpacity
                style={styles.resetButton}
                onPress={() => dispatch(resetCoins())}
            >
                <Text style={styles.resetButtonText}>Reset Coins</Text>
            </TouchableOpacity>

            {/* ganti list & grid */}
            <View style={styles.toggleView}>
                <Text style={styles.availableProductsText}>Available Products</Text>
                <TouchableOpacity onPress={toggleView}>
                    <MaterialIcons
                        name={isGridView ? 'view-list' : 'view-module'}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            {/* product list */}
            <FlatList
                key={isGridView ? 'grid' : 'list'}
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={isGridView ? 2 : 1}
                contentContainerStyle={styles.listContainer}
            />

            {/* minigame button*/}
            <TouchableOpacity style={styles.floatingButton}
            onPress={()=>router.push('Minigame')}>
                <FontAwesome5 name="gamepad" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    searchIcon: {
        position: 'absolute',
        left: 5,
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingLeft: 40,
        paddingRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    myProductsButton: {
        marginLeft: 10,
        backgroundColor: '#6b5b95',
        padding: 10,
        borderRadius: 20,
    },
    myProductsButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    coinBalance: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    coinText: {
        fontSize: 18,
        marginRight: 5,
    },
    toggleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    availableProductsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        elevation: 3,
        flex: 1,
    },
    gridItem: {
        flex: 0.5,
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff6347',
        borderRadius: 50,
        padding: 15,
        elevation: 5,
    },
    resetButton: {
        marginLeft: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
    },
    resetButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    productID: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default HomePage;