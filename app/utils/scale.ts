import {Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

// Define breakpoints (like media queries)
let guidelineBaseWidth;

if (screenWidth <= 320) {
  // Small devices (e.g., iPhone SE)
  guidelineBaseWidth = 320;
} else if (screenWidth <= 375) {
  // Regular phones (e.g., iPhone 11, Pixel 4)
  guidelineBaseWidth = 360;
} else if (screenWidth <= 414) {
  // Larger phones (e.g., iPhone 12 Pro Max)
  guidelineBaseWidth = 390;
} else if (screenWidth <= 600) {
  // Small tablets / XL phones
  guidelineBaseWidth = 480;
} else {
  // Tablets (e.g., iPad Mini, iPad Pro)
  guidelineBaseWidth = 600;
}

// Single scale function based on selected base width
export const scale = (size:number) => (screenWidth / guidelineBaseWidth) * size;
