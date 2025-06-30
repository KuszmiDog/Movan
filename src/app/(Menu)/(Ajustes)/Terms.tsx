import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    textAlign: 'center',
    padding: moderateScale(1),
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
  content: {
    flex: 1,
    padding: moderateScale(20),
  },
  section: {
    marginBottom: verticalScale(20),
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  sectionText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    opacity: 0.9,
  },
  footer: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(40),
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'white',
    opacity: 0.7,
  },
});

export default Terms;