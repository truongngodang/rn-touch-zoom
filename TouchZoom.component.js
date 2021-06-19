import React, { memo } from 'react'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const TouchZoom: () => React$Node = (props, _ref) => {
  const {
    style = null,
    styleContainer = null,
    children = null,
    onPress = () => {},
    onLongPress = () => {},
    zoomSize = 0.96,
  } = props

  const _onPress = debounce(onPress, 300, { leading: true, trailing: false })

  const zoomValue = useSharedValue(1)

  const _handlePressIn = () => {
    zoomValue.value = withTiming(zoomSize)
  }

  const _handlePressOut = () => {
    zoomValue.value = withTiming(1)
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: zoomValue.value }],
    }
  })

  return (
    <Pressable
      activeOpacity={1}
      onPressIn={_handlePressIn}
      onPressOut={_handlePressOut}
      onLongPress={onLongPress}
      onPress={_onPress}
      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
      style={styleContainer}
      {...props}
    >
      <Animated.View style={[animatedStyles, style]}>{children}</Animated.View>
    </Pressable>
  )
}

TouchZoom.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any.isRequired,
  onPress: PropTypes.func,
  zoomSize: PropTypes.number,
}

export default memo(TouchZoom)
