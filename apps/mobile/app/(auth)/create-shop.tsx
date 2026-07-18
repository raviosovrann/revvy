import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CreateShopScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    // TODO: Implement shop creation flow with OTP verification
    router.push({ pathname: '/(auth)/verify-otp', params: { phone, flow: 'create-shop' } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Shop</Text>
      <Text style={styles.description}>Get started with your auto-service business on Revvy.</Text>

      <TextInput
        style={styles.input}
        placeholder="+1 (555) 000-0000"
        placeholderTextColor="#666"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoComplete="tel"
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#a0a0b0',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
