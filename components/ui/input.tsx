import * as React from "react"
import { TextInput, type TextInputProps, StyleSheet } from "react-native"

export interface InputProps extends TextInputProps {
  style?: any
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, ...props }, ref) => {
    return (
      <TextInput
        style={[styles.input, style]}
        ref={ref}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#374151',
  },
})

export { Input }
