import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default {
  window: {
    width,
    height
  },
  fontScale: width >= 760 ? 1.2 : width / 320,
  isSmallDevice: width < 375,
  isLargeDevice: width > 720
}
