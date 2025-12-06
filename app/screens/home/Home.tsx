import { RootStackParamList } from '@appTypes/navigation';
import Screen from '@components/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { scale } from '@utils/scale';
import React from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TopTabs = ['Explore', 'For You', 'Categories'];
const { width } = Dimensions.get('window');

const Home = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const flatListRef = React.useRef<FlatList>(null);

  const handleTabPress = (index: number) => {
    setSelectedTabIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (pageIndex !== selectedTabIndex) setSelectedTabIndex(pageIndex);
  };

  return (
    <Screen>
      <View style={styles.tagContainer}>
        {TopTabs?.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleTabPress(index)}>
            <Text
              style={{
                fontSize: scale(18),
                fontWeight: '600',
                color: selectedTabIndex === index ? 'black' : 'gray',
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={TopTabs}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.page,
              { backgroundColor: 'blue', opacity: 1 - index * 0.3 },
            ]}
          >
            <Text style={styles.pageText}>{item} Page Content</Text>
          </View>
        )}
      />
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  tagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: scale(12),
    gap: scale(20),
    flexDirection: 'row',
  },
  page: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageText: {
    fontSize: scale(20),
    fontWeight: '700',
  },
});
