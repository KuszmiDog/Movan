import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from "@/src/constants/imagePaths"
import TermsAndCon from '@/src/components/atoms/TermsAndCon'
import styles from '@/src/constants/Movan_introduction_styles/TermsAndCon_styles'

const TermsAndC = () => {

  const roles = [
    { label: 'Transportista Privado', value: 'private', description: 'Un transportista privado realiza envíos de manera independiente.' },
    { label: 'Transporte', value: 'transport', description: 'Un transporte es una empresa que ofrece servicios de envío.' },
    { label: 'Particular', value: 'individual', description: 'Un particular utiliza la aplicación para envíos personales.' },
  ];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  })

  return (

    <SafeAreaView style={styles.container} >
      <View style={styles.movanlogo}>
        <Image source={imagePath.iconMovan} style={styles.logoimage} />
        <Text style={styles.textLogo}>Transportá. Conectá. Mové.</Text>
      </View>

      <View>
        <TermsAndCon />
      </View>

      <View style={styles.mApacheLogo}>
        <Image source={imagePath.iconMApache} style={styles.mApacheLogoImage} />
        <Text style={styles.mApacheFont}>from mApache</Text>
      </View>

    </SafeAreaView>
  )
}
export default TermsAndC