import Config from 'react-native-config';
import axiosInstance from '~axios-instance/index';

const getAutocompletePlaces = (keyword: string) => {
  return axiosInstance.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${keyword}&components=country:my&key=${Config.GOOGLE_API_KEY}`,
  );
};

const getPlaceCoordinate = (placeId: string) => {
  return axiosInstance.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${Config.GOOGLE_API_KEY}`,
  );
};

export {getAutocompletePlaces, getPlaceCoordinate};
