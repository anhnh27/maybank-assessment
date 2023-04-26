import {FC, memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import PinPointIcon from '~assets/icons/PinPointIcon';
import {autocompleteSelector} from '~modules/places';
import {historiesSelector} from '~modules/places-histories';
import AppColors from '~themes/app-colors';
import PredictItem from './components/PredictItem';
import {PlacesSearchInputProps} from './types';
import useSearchPlaces from './useSearchPlaces';

const PlacesSearchInput: FC<PlacesSearchInputProps> = ({
  style,
  onFocus,
  onBlur,
}) => {
  const autocompleteResults = useSelector(autocompleteSelector);

  const histories = useSelector(historiesSelector);

  const {
    isFocusing,
    textInputRef,
    keyword,
    onKeywordChange,
    onPlaceSelected,
    hanldleFocus,
    hanldleBlur,
  } = useSearchPlaces({onFocus, onBlur});

  return (
    <View style={style}>
      <View style={styles.searchContainer}>
        <PinPointIcon style={styles.icon} />
        <TextInput
          ref={textInputRef}
          value={keyword}
          style={styles.textInput}
          placeholder="Search here"
          onChangeText={onKeywordChange}
          onFocus={hanldleFocus}
          onBlur={hanldleBlur}
        />
      </View>

      <View style={styles.autoCompleteListContainer}>
        {isFocusing &&
          histories
            .filter(x => x.mainText.indexOf(keyword) !== -1)
            .slice(-5)
            .map((predict, index) => {
              return (
                <PredictItem
                  key={`history_${index}`}
                  {...predict}
                  onPress={onPlaceSelected}
                  isHistory={true}
                  isLastItem={index === autocompleteResults.length - 1}
                />
              );
            })}
        {isFocusing &&
          autocompleteResults.map((predict, index) => {
            return (
              <PredictItem
                key={index}
                {...predict}
                onPress={onPlaceSelected}
                isLastItem={index === autocompleteResults.length - 1}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    height: 38,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: AppColors.white,

    shadowColor: AppColors.black,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,

    elevation: 24,
  },
  textInput: {
    flex: 1,
    height: '100%',
    backgroundColor: AppColors.white,
  },
  icon: {
    width: 36,
    marginHorizontal: 8,
  },
  autoCompleteListContainer: {
    paddingHorizontal: 24,
    backgroundColor: '#ffffff95',
  },
});

export default memo(PlacesSearchInput);
