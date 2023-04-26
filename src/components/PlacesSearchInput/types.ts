import {ViewProps} from 'react-native';
import {PredictItemData} from '~modules/places/types';

export type PlacesSearchInputProps = Pick<ViewProps, 'style'> & {
  onFocus: () => void;
  onBlur: () => void;
};

export type PredictItemProps = PredictItemData & {
  onPress: (place: PredictItemData) => void;
  isHistory?: boolean;
  isLastItem: boolean;
};
