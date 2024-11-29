import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const HomePage = () => {
    const [products, setProducts] = useState([]); // Original product list
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products for search
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [isGridView, setIsGridView] = useState(false);

    // Fetch product data from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data); // Initially, show all products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Handle search input
    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const toggleView = () => setIsGridView(!isGridView);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.itemContainer, isGridView && styles.gridItem]}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TextInput
                    placeholder="Search Product..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
                />
                <TouchableOpacity style={styles.myProductsButton}>
                    <Text style={styles.myProductsButtonText}>My Products</Text>
                </TouchableOpacity>
                <View style={styles.coinBalance}>
                    <Text style={styles.coinText}>500</Text>
                    <FontAwesome5 name="money-bill" size={16} color="gold" />
                </View>
            </View>

            {/* Toggle View */}
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

            {/* Product List */}
            <FlatList
                key={isGridView ? 'grid' : 'list'}
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={isGridView ? 2 : 1}
                contentContainerStyle={styles.listContainer}
            />

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.floatingButton}>
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
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,
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
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinText: {
        fontSize: 16,
        color: '#6b5b95',
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
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'column', // Changed to column to stack title and price
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    gridItem: {
        flex: 1,
        margin: 5,
        flexDirection: 'column',
        alignItems: 'center',
    },
    productImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6b5b95',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default HomePage;