import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { Radio, CheckBox } from "./inputs"
import { moderateScale, verticalScale } from 'react-native-size-matters'
import React, { useState } from 'react'
import BottomComponents from '@/src/components/atoms/BottomComponents'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/src/constants/colors'
import { first_terms, expanded_terms } from '@/src/constants/TermsAndConText'

const TermsAndCon = () => {
    const [states, setState] = useState([])
    const [selectedRole, setSelectedRole] = useState(null);
    const [infoVisible, setInfoVisible] = useState(false);

    return (
        <View style={styles.container}>
            
            <Modal
                visible={infoVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setInfoVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Términos y Condiciones</Text>
                        <Text style={styles.modalText}>{expanded_terms.description}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setInfoVisible(false)}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            
            {states.length > 0 && (
                <View style={styles.buttonlocation}>
                    <BottomComponents tittle="Siguiente" navigateTo="AccountLogin" />
                </View>
            )}

            {/* Card de términos y condiciones */}
            <View style={styles.termsCard}>
                <MaterialCommunityIcons
                    name="file-document-outline"
                    size={40}
                    color={colors.primary}
                    style={{ marginBottom: 8 }}
                />
                <Text style={styles.termsText}>
                    {first_terms.description}
                </Text>
            </View>

            <TouchableOpacity style={styles.infoButton} onPress={() => setInfoVisible(true)}>
                <MaterialCommunityIcons name="information-outline" size={28} color={colors.white} />
                <Text style={styles.text}>Conocer más acerca de los términos</Text>
            </TouchableOpacity>

            <CheckBox  
                options={[
                    { label: "Acepto los términos y condiciones", value: "accepted" }
                ]}
                checkedvalues={states}
                OnChange={setState}
                style={{ marginBottom: 35 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 15,
        fontFamily: "Roboto"
    },
    container: {
        top: 40,
        margin: 18,
        padding: 18,
    },
    buttonlocation:{
        top: verticalScale(480),
        width: "100%",
        left: moderateScale(20),
        position: "absolute",
        zIndex: 1,
    },
    infoButton: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        position: 'relative',
        top: 0,
        right: 0,
        padding: 10,        
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        width: '85%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: colors.primary,
    },
    modalText: {
        fontSize: 14,
        color: colors.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: colors.secondary,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    termsCard: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 26,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        height: 250,
    },
    termsText: {
        color: "black",
        fontSize: 14,
        textAlign: 'center',
    },
})

export default TermsAndCon;