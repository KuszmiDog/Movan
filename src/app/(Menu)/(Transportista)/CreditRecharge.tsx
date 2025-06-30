import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import styles from '@/src/constants/TransportCreditRecharge_style/CreditRecharge_style';
import { useAuth } from '../../../utils/AuthContext';

export default function CreditRecharge() {
  const { simulateRecharge, getUserCredits } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const rechargeOptions = [
    { credits: 5, price: 5000, popular: false },
    { credits: 10, price: 9000, popular: true },
    { credits: 20, price: 16000, popular: false },
    { credits: 50, price: 35000, popular: false },
  ];

  const handleRecharge = async (credits: number, price: number) => {
    Alert.alert(
      'Confirmar Recarga',
      `¿Confirmas la compra de ${credits} créditos por $${price.toLocaleString('es-AR')}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              setLoading(true);
              const success = await simulateRecharge(credits);
              
              if (success) {
                Alert.alert(
                  '¡Recarga Exitosa!',
                  `Se han agregado ${credits} créditos a tu cuenta.`,
                  [
                    { 
                      text: 'Ver Historial',
                      onPress: () => router.push('/(Menu)/(Transportista)/CreditHistory')
                    },
                    { 
                      text: 'Continuar',
                      onPress: () => router.back()
                    }
                  ]
                );
              } else {
                Alert.alert('Error', 'No se pudo procesar la recarga. Intenta nuevamente.');
              }
            } catch (error) {
              console.error('Error en recarga:', error);
              Alert.alert('Error', 'Ocurrió un error durante la recarga.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Recargar Créditos</Text>
      </View>

      <View style={styles.infoCard}>
        <MaterialCommunityIcons name="information" size={32} color="#FFD700" />
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>¿Cómo funcionan los créditos?</Text>
          <Text style={styles.infoDescription}>
            Cada pedido que aceptes consume 1 crédito. Los créditos te permiten acceder a más oportunidades de trabajo.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Selecciona tu paquete:</Text>

      <View style={styles.optionsContainer}>
        {rechargeOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionCard,
              option.popular && styles.popularCard
            ]}
            onPress={() => handleRecharge(option.credits, option.price)}
            disabled={loading}
          >
            {option.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MÁS POPULAR</Text>
              </View>
            )}
            
            <View style={styles.optionContent}>
              <MaterialCommunityIcons name="cash" size={40} color="#FFD700" />
              <View style={styles.optionInfo}>
                <Text style={styles.creditsAmount}>{option.credits} Créditos</Text>
                <Text style={styles.priceAmount}>${option.price.toLocaleString('es-AR')}</Text>
                <Text style={styles.pricePerCredit}>
                  ${(option.price / option.credits).toLocaleString('es-AR')} por crédito
                </Text>
              </View>
            </View>

            {option.credits >= 10 && (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>
                  Ahorras ${((5 * 1000) - (option.price / option.credits * option.credits)).toFixed(0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
