import {PayloadAction} from '@reduxjs/toolkit';

export type PromisePayloadAction<T> = PayloadAction<T> & {
  $result: {
    value: object | boolean;
  };
};
