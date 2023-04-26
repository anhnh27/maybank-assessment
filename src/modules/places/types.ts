import {Region} from 'react-native-maps';

export type PredictItemData = {
  mainText: string;
  secondaryText: string;
  placeId: string;
};

export type AutocompleteResult = {
  predictions: {
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }[];
};

export type PlaceResult = {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
};

export type PlacesState = {
  selectedPlace: Region;
  autocomplete: PredictItemData[];
};
