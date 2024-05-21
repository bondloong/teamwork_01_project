import {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from '@reduxjs/toolkit';

export type TCreateReduxStore = () => EnhancedStore<
  IStateSchema,
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<IStateSchema, undefined, UnknownAction>;
      }>,
      StoreEnhancer,
    ]
  >
>;

export type AppDispatch = ReturnType<TCreateReduxStore>['dispatch'];
