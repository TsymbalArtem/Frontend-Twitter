import produce, { Draft } from 'immer';
import { LoadingStatus } from '../types';
import { ConnectPeopleActions } from './actionCreators';
import { ConnectPeopleActionsTypes } from './contracts/actionTypes';
import { IConnectPeopleState } from './contracts/state';

const initialConnectPeopleState: IConnectPeopleState = {
  items: [],
  loadingState: LoadingStatus.NEVER,
};

export const connectPeopleReducer = produce((draft: Draft<IConnectPeopleState>, action: ConnectPeopleActions) => {
  switch (action.type) {
    case ConnectPeopleActionsTypes.FETCH_CONNECT_PEOPLE:
      draft.items = [];
      draft.loadingState = LoadingStatus.LOADING;
      break;
    case ConnectPeopleActionsTypes.SET_CONNECT_PEOPLE:
      draft.items = action.payload;
      draft.loadingState = LoadingStatus.LOADED;
      break;

    default:
      break;
  }
}, initialConnectPeopleState);