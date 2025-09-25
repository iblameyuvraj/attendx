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
  LinearGradient,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);

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
      email: '',
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
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-gradient-to-br from-slate-50 to-blue-50"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center px-6 py-12">
            <Animated.View style={{ opacity: fadeAnim }}>
              {/* Logo/Brand Section */}
              <View className="items-center mb-8">
                <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
                  <Text className="text-white text-2xl font-bold">A</Text>
                </View>
                <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome back</Text>
                <Text className="text-gray-600 text-center text-base">
                  Sign in to continue to AttendX
                </Text>
              </View>

              {/* Login Form */}
              <Card className="mx-auto w-full max-w-sm bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-2xl font-semibold text-center text-gray-900">
                    Sign in
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <View className="space-y-2">
                    <Label className="text-gray-700 font-medium">Email</Label>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="name@example.com"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoComplete="email"
                          className={cn(
                            "bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500",
                            errors.email && "border-red-500"
                          )}
                        />
                      )}
                    />
                    {errors.email && (
                      <Text className="text-red-500 text-sm">{errors.email.message}</Text>
                    )}
                  </View>

                  <View className="space-y-2">
                    <Label className="text-gray-700 font-medium">Password</Label>
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
                          className={cn(
                            "bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500",
                            errors.password && "border-red-500"
                          )}
                        />
                      )}
                    />
                    {errors.password && (
                      <Text className="text-red-500 text-sm">{errors.password.message}</Text>
                    )}
                  </View>

                  <Pressable
                    onPress={() => {}}
                    className="self-end"
                  >
                    <Text className="text-blue-600 text-sm font-medium">
                      Forgot password?
                    </Text>
                  </Pressable>

                  <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-lg shadow-lg"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>

                  <View className="relative">
                    <View className="absolute inset-0 flex items-center">
                      <View className="w-full border-t border-gray-200" />
                    </View>
                    <View className="relative flex justify-center text-xs uppercase">
                      <Text className="bg-white px-2 text-gray-500">Or continue with</Text>
                    </View>
                  </View>

                  <View className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="bg-white border-gray-200 hover:bg-gray-50"
                      onPress={() => {}}
                    >
                      <Text className="text-gray-700">Google</Text>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white border-gray-200 hover:bg-gray-50"
                      onPress={() => {}}
                    >
                      <Text className="text-gray-700">Apple</Text>
                    </Button>
                  </View>
                </CardContent>
              </Card>

              {/* Sign up link */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-600">Don't have an account? </Text>
                <Pressable onPress={() => router.push('/signup')}>
                  <Text className="text-blue-600 font-medium">Sign up</Text>
                </Pressable>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
