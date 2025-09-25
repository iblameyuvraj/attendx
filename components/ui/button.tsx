import * as React from "react"
import { Pressable, Text, StyleSheet } from "react-native"

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children?: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  style?: any
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ variant = 'default', size = 'default', children, style, ...props }, ref) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    style
  ]
  
  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    size !== 'icon' ? styles[`${size}Text`] : null
  ].filter(Boolean)

  return (
    <Pressable
      style={buttonStyle}
      ref={ref}
      {...props}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </Pressable>
  )
})
Button.displayName = "Button"

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 36,
  },
  default: {
    backgroundColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  sm: {
    minHeight: 32,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  lg: {
    minHeight: 48,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  icon: {
    width: 36,
    height: 36,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  defaultText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#374151',
  },
  secondaryText: {
    color: '#374151',
  },
  ghostText: {
    color: '#374151',
  },
  linkText: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  smText: {
    fontSize: 12,
  },
  lgText: {
    fontSize: 16,
  },
})

export { Button }
