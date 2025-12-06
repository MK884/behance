import { Dimensions } from "react-native";

const { width: DeviceWidth, height: DeviceHeight } = Dimensions.get("window");

export const getColumsNum = () => {
  if (DeviceWidth >= 1024) {
    // desktop
    return 4;
  } else if (DeviceWidth >= 768) {
    // tablet
    return 3;
  } else {
    return 2;
    
  }
};