import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import styles from '@/src/constants/Help_styles/Help_style';

const Help = () => {
  type MaterialCommunityIconName =
    | "help-circle"
    | "account-question-outline"
    | "credit-card"
    | "alert-circle"
    | "message"
    | "phone"
    | "email";
  
  type Faq = {
    title: string;
    icon: MaterialCommunityIconName;
  };
  
  const faqs: Faq[] = [
    {
      title: '¿Cómo funciona el servicio?',
      icon: 'help-circle'
    },
    {
      title: 'Problemas con mi cuenta',
      icon: 'account-question-outline'
    },
    {
      title: 'Problemas con pagos',
      icon: 'credit-card'
    },
    {
      title: 'Reportar un problema',
      icon: 'alert-circle'
    }
  ];
  
  const supportOptions: Faq[] = [
    {
      title: 'Chat con Soporte',
      icon: 'message'
    },
    {
      title: 'Llamar a Soporte',
      icon: 'phone'
    },
    {
      title: 'Enviar Email',
      icon: 'email'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ayuda y Soporte</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
        <View style={styles.optionsContainer}>
          {faqs.map((item, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <MaterialCommunityIcons name={item.icon} size={24} color="white" />
              <Text style={styles.optionText}>{item.title}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Contactar Soporte</Text>
        <View style={styles.optionsContainer}>
          {supportOptions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <MaterialCommunityIcons name={item.icon} size={24} color="white" />
              <Text style={styles.optionText}>{item.title}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default Help;