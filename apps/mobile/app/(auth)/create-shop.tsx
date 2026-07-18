import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CreateShopScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (!phone.trim()) return;
    // TODO: Implement shop creation flow with OTP verification
    router.push({ pathname: '/(auth)/verify-otp', params: { phone, flow: 'create-shop' } });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create a Shop</Text>
          <Text style={styles.description}>
            Get started with your auto-service business on Revvy.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="+1 (555) 000-0000"
            placeholderTextColor="#666"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />

          <TouchableOpacity
            style={[styles.button, !phone.trim() && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={!phone.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
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
  buttonDisabled: {
    backgroundColor: '#4f46e5aa',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
