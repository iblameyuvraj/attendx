import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const teacherLoginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type TeacherLoginForm = z.infer<typeof teacherLoginSchema>;

export default function TeacherLoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<TeacherLoginForm>({
    resolver: zodResolver(teacherLoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (_data: TeacherLoginForm) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.headerSection}>
              <Text style={styles.welcomeTitle}>Teacher Login</Text>
              <Text style={styles.welcomeSubtitle}>Use your email to continue</Text>
            </View>

            <Card style={styles.card}>
              <CardHeader style={styles.cardHeader}>
                <CardDescription style={styles.cardDescription}>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent style={styles.cardContent}>
                <View style={styles.formField}>
                  <Label style={styles.label}>Email</Label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="name@example.com"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        autoComplete="email"
                        style={[styles.input, (errors as any).email && styles.inputError]}
                      />
                    )}
                  />
                  {(errors as any).email && (
                    <Text style={styles.errorText}>{(errors as any).email.message as string}</Text>
                  )}
                </View>

                <View style={styles.formField}>
                  <Label style={styles.label}>Password</Label>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Enter your password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry
                        autoComplete="password"
                        style={[styles.input, errors.password && styles.inputError]}
                      />
                    )}
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  )}
                </View>

                <Button onPress={handleSubmit(onSubmit)} disabled={isLoading} style={styles.signInButton}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { backgroundColor: '#000000' },
  scrollContainer: { flexGrow: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },
  headerSection: { alignItems: 'center', marginBottom: 24 },
  welcomeTitle: { fontSize: 30, fontWeight: 'bold', color: '#e5e7eb', marginBottom: 8 },
  welcomeSubtitle: { color: '#9ca3af', textAlign: 'center', fontSize: 16 },
  card: { marginHorizontal: 'auto', width: '100%', maxWidth: 400, backgroundColor: '#111827', borderColor: '#1f2937', borderWidth: 1 },
  cardHeader: { paddingBottom: 16 },
  cardDescription: { textAlign: 'center', color: '#9ca3af' },
  cardContent: { gap: 16 },
  formField: { gap: 8 },
  label: { color: '#d1d5db', fontWeight: '500' },
  input: { backgroundColor: '#0f172a', borderColor: '#374151', color: '#e5e7eb' },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#f87171', fontSize: 14 },
  signInButton: { width: '100%', backgroundColor: '#3b82f6', height: 48, borderRadius: 8 },
});
