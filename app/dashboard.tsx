import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardScreen() {
  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        <View className="px-6 py-12">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-3xl font-bold text-gray-900">Dashboard</Text>
              <Text className="text-gray-600 mt-1">Welcome back to AttendX</Text>
            </View>
            <Pressable
              onPress={handleLogout}
              className="bg-white rounded-full p-3 shadow-lg"
            >
              <Text className="text-blue-600 font-medium">Logout</Text>
            </Pressable>
          </View>

          {/* Stats Cards */}
          <View className="space-y-4 mb-8">
            <View className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-600">Total Events</CardDescription>
                  <CardTitle className="text-2xl font-bold text-blue-600">24</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-600">Attendance Rate</CardDescription>
                  <CardTitle className="text-2xl font-bold text-green-600">92%</CardTitle>
                </CardHeader>
              </Card>
            </View>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your latest attendance records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <View className="flex-row justify-between items-center py-2">
                  <View>
                    <Text className="font-medium text-gray-900">Team Meeting</Text>
                    <Text className="text-sm text-gray-600">Today, 2:00 PM</Text>
                  </View>
                  <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-800 text-xs font-medium">Present</Text>
                  </View>
                </View>
                
                <View className="flex-row justify-between items-center py-2">
                  <View>
                    <Text className="font-medium text-gray-900">Project Review</Text>
                    <Text className="text-sm text-gray-600">Yesterday, 10:00 AM</Text>
                  </View>
                  <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-800 text-xs font-medium">Present</Text>
                  </View>
                </View>
                
                <View className="flex-row justify-between items-center py-2">
                  <View>
                    <Text className="font-medium text-gray-900">Client Call</Text>
                    <Text className="text-sm text-gray-600">Dec 23, 3:30 PM</Text>
                  </View>
                  <View className="bg-red-100 px-3 py-1 rounded-full">
                    <Text className="text-red-800 text-xs font-medium">Absent</Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-lg shadow-lg">
              Mark Attendance
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-white border-gray-200 hover:bg-gray-50 h-12 rounded-lg shadow-lg"
            >
              <Text className="text-gray-700">View Schedule</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
