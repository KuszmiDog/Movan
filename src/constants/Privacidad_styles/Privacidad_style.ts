import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#565EB3',
    },
    header: {
        padding: verticalScale(20),
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    optionsContainer: {
        padding: moderateScale(20),
    },
    option: {
        backgroundColor: '#262E93',
        padding: moderateScale(15),
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionTextContainer: {
        flex: 1,
        marginRight: moderateScale(10),
    },
    optionTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionDescription: {
        color: 'white',
        fontSize: 12,
        opacity: 0.8,
    },
    actionButton: {
        backgroundColor: '#262E93',
        padding: moderateScale(15),
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#FF4B4B',
        marginTop: verticalScale(20),
    },
});

export default styles;