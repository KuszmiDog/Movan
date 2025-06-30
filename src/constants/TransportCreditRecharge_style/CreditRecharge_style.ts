import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262E93',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 10,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#565EB3',
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 15,
    },
    infoTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    infoDescription: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 13,
        lineHeight: 18,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 12,
    },
    optionsContainer: {
        paddingHorizontal: 20,
        flex: 1,
    },
    optionCard: {
        backgroundColor: '#565EB3',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'transparent',
        minHeight: 100,
    },
    popularCard: {
        borderColor: '#FFD700',
        position: 'relative',
    },
    popularBadge: {
        position: 'absolute',
        top: -6,
        right: 15,
        backgroundColor: '#FFD700',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    },
    popularText: {
        color: '#262E93',
        fontSize: 11,
        fontWeight: 'bold',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    optionInfo: {
        flex: 1,
        marginLeft: 15,
    },
    creditsAmount: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    priceAmount: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
    },
    pricePerCredit: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        marginTop: 2,
    },
    savingsBadge: {
        alignSelf: 'flex-end',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        marginTop: 5,
    },
    savingsText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
    },
});

export default styles;