import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addCoins } from '../src/coinsSlice';
import { useRouter } from 'expo-router';

const Minigame = () => {
    const [isEggCracked, setIsEggCracked] = useState(false);
    const [prize, setPrize] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const prizes = [
        { name: 'Bronze Coin', value: 10, image: require('../assets/bronze-coin.png') },
        { name: 'Silver Coin', value: 50, image: require('../assets/silver-coin.png') },
        { name: 'Gold Coin', value: 100, image: require('../assets/gold-coin.png') },
    ];

    const handleEggClick = () => {
        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
        setPrize(randomPrize);
        dispatch(addCoins(randomPrize.value));
        setIsEggCracked(true);
    };

    const resetGame = () => {
        setIsEggCracked(false);
        setPrize(null);
    };

    return (
        <View style={styles.container}>
            {!isEggCracked ? (
                <View style={styles.gameContainer}>
                    <View style={styles.prizesContainer}>
                        {prizes.map((item, index) => (
                            <View key={index} style={styles.prize}>
                                <Image source={item.image} style={styles.coinImage} />
                                <Text>{item.value}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.instructionText}>
                        Click on the egg to get your prize!
                    </Text>

                    <TouchableOpacity onPress={handleEggClick}>
                        <Image
                            source={require('../assets/egg-full.png')}
                            style={styles.eggImage}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.resultContainer}>
                    <Image
                        source={require('../assets/egg-broken.png')}
                        style={styles.eggImage}
                    />
                    <Text style={styles.congratulationsText}>
                        Congratulations! You got a {prize.name}!
                    </Text>
                    <Image source={prize.image} style={styles.coinImage} />
                    <Text style={styles.coinValueText}>
                        {prize.value} coins have been added to your balance
                    </Text>

                    <TouchableOpacity style={styles.backButton} onPress={resetGame}>
                        <Text style={styles.backButtonText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#6b5b95',
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    gameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prizesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    prize: {
        alignItems: 'center',
    },
    coinImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    instructionText: {
        fontSize: 18,
        marginBottom: 20,
    },
    eggImage: {
        width: 150,
        height: 150,
    },
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    congratulationsText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    coinValueText: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default Minigame;
