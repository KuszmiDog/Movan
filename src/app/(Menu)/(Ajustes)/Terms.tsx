import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import styles from '@/src/constants/Terminos_styles/Terminos_styles';

const Terms = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Términos y Condiciones</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Aceptación de Términos</Text>
          <Text style={styles.sectionText}>
            Al acceder y utilizar la aplicación Movan, usted acepta estar sujeto a estos términos y condiciones de uso. 
            Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice la aplicación.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Servicios de Transporte</Text>
          <Text style={styles.sectionText}>
            Movan es una plataforma que facilita la conexión entre transportistas y usuarios que necesitan 
            servicios de transporte de mercancías. No somos proveedores directos de servicios de transporte.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Registro y Cuenta</Text>
          <Text style={styles.sectionText}>
            Para utilizar nuestros servicios, debe crear una cuenta proporcionando información precisa y actualizada. 
            Usted es responsable de mantener la confidencialidad de su cuenta.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Privacidad</Text>
          <Text style={styles.sectionText}>
            Su privacidad es importante para nosotros. Recopilamos y utilizamos su información según 
            lo descrito en nuestra Política de Privacidad.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Modificaciones</Text>
          <Text style={styles.sectionText}>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán 
            en vigor inmediatamente después de su publicación en la aplicación.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Última actualización: Junio 2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;