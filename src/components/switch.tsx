import { Switch as NativeSwitch } from 'react-native'

export function Switch({
  ...props
}: React.ComponentPropsWithoutRef<typeof NativeSwitch>) {
  return (
    <NativeSwitch
      trackColor={{
        true: '#f97316',
        false: '#525252',
      }}
      thumbColor={'#f97316'}
      {...props}
    />
  )
}
