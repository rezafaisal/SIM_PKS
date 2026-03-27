import { MantineColor, useMantineTheme } from '@mantine/core'

const colors: MantineColor[] = ['red', 'orange', 'yellow', 'teal', 'blue', 'cyan', 'grape']

export function useGenerateColor() {
  const { colors: theme } = useMantineTheme()

  return {
    color(n: number): MantineColor {
      return colors[n % colors.length]
    },
    mantineColor(n: number, index: number): string {
      return theme[colors[n % colors.length]][index]
    },
  }
}
