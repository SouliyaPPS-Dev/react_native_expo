import { Pressable, Text, useColorMode } from 'native-base';

// Separate component for color mode toggle
function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Pressable
      onPress={toggleColorMode}
      style={{
        padding: 8,
        borderRadius: 50,
        marginRight: 15,
      }}
    >
      <Text
        fontSize='17px'
        fontWeight='bold'
        color={colorMode === 'dark' ? 'dark.text' : 'light.text'}
      >
        {colorMode === 'light' ? '🌙' : '☀️'}
      </Text>
    </Pressable>
  );
}

export default ColorModeToggle;
