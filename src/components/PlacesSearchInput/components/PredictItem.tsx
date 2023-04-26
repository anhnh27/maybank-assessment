import {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ClockHistoryIcon from '~assets/icons/ClockHistoryIcon';
import AppColors from '~themes/app-colors';
import {PredictItemProps} from '../types';

const PredictItem: FC<PredictItemProps> = ({
  mainText,
  secondaryText,
  placeId,
  isHistory = false,
  isLastItem,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isLastItem && styles.lastItem]}
      onPress={() => onPress({mainText, secondaryText, placeId})}>
      <View style={styles.textContainer}>
        <Text style={styles.main}>{mainText}</Text>
        <Text style={styles.second} numberOfLines={1} ellipsizeMode={'tail'}>
          {secondaryText}
        </Text>
      </View>
      {isHistory && (
        <View style={styles.iconContainer}>
          <ClockHistoryIcon />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomColor: AppColors.silver,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    marginHorizontal: 12,
  },
  main: {
    fontWeight: '600',
    fontSize: 14,
    color: AppColors.primaryText,
  },
  second: {
    marginTop: 6,
    color: AppColors.secondaryText,
    fontSize: 11,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});

export default memo(PredictItem);
