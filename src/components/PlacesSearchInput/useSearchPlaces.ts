import {createRef, useCallback, useState} from 'react';
import {TextInput} from 'react-native';
import {placesDispatcher} from '~modules/places';
import {placeHistoriesDispatcher} from '~modules/places-histories';
import {PredictItemData} from '~modules/places/types';

const useSearchPlaces = ({
  onFocus,
  onBlur,
}: {
  onFocus: () => void;
  onBlur: () => void;
}) => {
  const [keyword, setKeyword] = useState('');
  const [isFocusing, setIsFocusing] = useState(false);

  const textInputRef = createRef<TextInput>();

  const getSuggestionPlaces = useCallback((text: string) => {
    placesDispatcher.getAutocompletePlaces({keyword: text});
  }, []);

  const onKeywordChange = useCallback(
    (text: string) => {
      setKeyword(text);
      getSuggestionPlaces(text);
    },
    [getSuggestionPlaces],
  );

  const onPlaceSelected = useCallback(
    (place: PredictItemData) => {
      const {mainText, placeId} = place;
      setKeyword(mainText);
      placesDispatcher.getPlaceCoordinate({placeId});
      placeHistoriesDispatcher.savePlaceToHistory(place);
      placesDispatcher.saveAutocompletePlaces([]);
      textInputRef.current?.blur();
    },
    [textInputRef],
  );

  const hanldleFocus = useCallback(() => {
    onFocus();
    setIsFocusing(true);
    if (keyword.length > 0) {
      getSuggestionPlaces(keyword);
    }
  }, [getSuggestionPlaces, keyword, onFocus]);

  const hanldleBlur = useCallback(() => {
    onBlur();
    setIsFocusing(false);
  }, [onBlur]);

  return {
    isFocusing,
    textInputRef,
    keyword,
    onKeywordChange,
    onPlaceSelected,
    hanldleFocus,
    hanldleBlur,
  };
};

export default useSearchPlaces;
