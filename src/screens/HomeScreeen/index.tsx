import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import PlacesSearchInput from '~components/PlacesSearchInput';
import {selectedPlaceSelector} from '~modules/places';
import AppColors from '~themes/app-colors';
import useHomeScreen from './useHomeScreen';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const topPosition = useMemo(() => {
    return {top: top !== 0 ? top : 24};
  }, [top]);

  const region = useSelector(selectedPlaceSelector);

  const {animatedStyle, handleOnFocus, handleOnBlur} = useHomeScreen();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundView, animatedStyle]} />
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        zoomEnabled={true}>
        <Marker coordinate={region} />
      </MapView>
      <PlacesSearchInput
        style={[styles.searchInput, topPosition]}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.whitesmoke,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: AppColors.whitesmoke,
  },
  map: {
    flex: 1,
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    shadowColor: AppColors.black,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 24,
    backgroundColor: '#0000',
    zIndex: 3,
  },
  backgroundView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AppColors.whitesmoke,
    zIndex: 1,
  },
});

export default HomeScreen;
