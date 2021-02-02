import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { LoadingState, ITweetsState, AddTweetFormState } from './contracts/state';

export const selectTweets = (state: RootState): ITweetsState => state.tweets;

export const selectLoadingState = (state: RootState): LoadingState =>
  selectTweets(state).loadingState;

export const selectAddTweetFormState = (state: RootState): AddTweetFormState =>
  selectTweets(state).addTweetFormState;

export const selectAreTweetsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADING;

export const selectAreTweetsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;

export const selectTweetsItems = createSelector(selectTweets, tweets => tweets.items);