import * as React from "react"
import { View, Text, StyleSheet } from "react-native"

interface CardProps extends React.ComponentPropsWithoutRef<typeof View> {
  style?: any
}

const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  CardProps
>(({ style, ...props }, ref) => (
  <View
    ref={ref}
    style={[styles.card, style]}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  CardProps
>(({ style, ...props }, ref) => (
  <View ref={ref} style={[styles.cardHeader, style]} {...props} />
))
CardHeader.displayName = "CardHeader"

interface CardTextProps extends React.ComponentPropsWithoutRef<typeof Text> {
  style?: any
}

const CardTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  CardTextProps
>(({ style, ...props }, ref) => (
  <Text
    ref={ref}
    style={[styles.cardTitle, style]}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  CardTextProps
>(({ style, ...props }, ref) => (
  <Text ref={ref} style={[styles.cardDescription, style]} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  CardProps
>(({ style, ...props }, ref) => (
  <View ref={ref} style={[styles.cardContent, style]} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  CardProps
>(({ style, ...props }, ref) => (
  <View ref={ref} style={[styles.cardFooter, style]} {...props} />
))
CardFooter.displayName = "CardFooter"

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 0,
  },
})

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
