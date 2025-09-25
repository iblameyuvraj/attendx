import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';
import { router, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  collegeId: z
    .string()
    .min(3, 'College ID is required')
    .max(50, 'College ID is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const [showRoleOptions, setShowRoleOptions] = useState(false);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      collegeId: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header Section (no logo) */}
            <View style={styles.headerSection}>
              <Text style={styles.welcomeTitle}>Sign in</Text>
              <Text style={styles.welcomeSubtitle}>Use your College ID to continue</Text>
            </View>
              {/* Login Form */}
              <Card style={styles.card}>
                <CardHeader style={styles.cardHeader}>
                  <CardDescription style={styles.cardDescription}>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent style={styles.cardContent}>
                  <View style={styles.formField}>
                    <Label style={styles.label}>College ID</Label>
                    <Controller
                      control={control}
                      name="collegeId"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="e.g. 22CS1234"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize="characters"
                          autoComplete="off"
                          style={[
                            styles.input,
                            (errors as any).collegeId && styles.inputError,
                          ]}
                        />
                      )}
                    />
                    {(errors as any).collegeId && (
                      <Text style={styles.errorText}>{(errors as any).collegeId.message as string}</Text>
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
                          style={[
                            styles.input,
                            errors.password && styles.inputError
                          ]}
                        />
                      )}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password.message}</Text>
                    )}
                  </View>

                  <Pressable onPress={() => {}} style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                  </Pressable>

                  <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    style={styles.signInButton}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>

                  <Pressable onPress={() => setShowRoleOptions((v) => !v)} style={styles.roleToggleLink}>
                    <Text style={styles.roleToggleText}>Login as teacher/admin</Text>
                  </Pressable>

                  {showRoleOptions && (
                    <View style={styles.roleOptionsContainer}>
                      <Link href="/login/teacher" asChild>
                        <Pressable style={styles.roleOptionButton}>
                          <Text style={styles.roleOptionText}>Login as Teacher</Text>
                        </Pressable>
                      </Link>
                      <Link href="/login/admin" asChild>
                        <Pressable style={styles.roleOptionButton}>
                          <Text style={styles.roleOptionText}>Login as Admin</Text>
                        </Pressable>
                      </Link>
                    </View>
                  )}

                  {/* Social logins removed as per requirements */}
                </CardContent>
              </Card>

              {/* Signup removed */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  animatedContainer: {
    flex: 1,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#0000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e5e7eb',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: '#9ca3af',
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    marginHorizontal: 'auto',
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
  },
  cardHeader: {
    paddingBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#e5e7eb',
  },
  cardDescription: {
    textAlign: 'center',
    color: '#9ca3af',
  },
  cardContent: {
    gap: 16,
  },
  formField: {
    gap: 8,
  },
  label: {
    color: '#d1d5db',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#0f172a',
    borderColor: '#374151',
    color: '#e5e7eb',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#f87171',
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    height: 48,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  roleToggleLink: {
    marginTop: 12,
    alignSelf: 'center',
  },
  roleToggleText: {
    color: '#93c5fd',
    fontSize: 14,
    fontWeight: '500',
  },
  roleOptionsContainer: {
    marginTop: 12,
    gap: 8,
  },
  roleOptionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
  },
  roleOptionText: {
    color: '#e5e7eb',
    textAlign: 'center',
    fontWeight: '500',
  },
  divider: {
    position: 'relative',
    marginVertical: 16,
  },
  dividerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  dividerTextContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dividerText: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    color: '#6b7280',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#6b7280',
  },
  signUpLink: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
})
;
