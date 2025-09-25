import * as React from "react"
import { Text, StyleSheet } from "react-native"

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  style?: any
}

const Label = React.forwardRef<React.ElementRef<typeof Text>, LabelProps>(
  ({ style, ...props }, ref) => (
    <Text
      ref={ref}
      style={[styles.label, style]}
      {...props}
    />
  )
)
Label.displayName = "Label"

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
})

export { Label }
