import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from './user.model';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, (state, action) => ({ ...state, user: action.user })),
  on(UserActions.logout, state => ({ ...state, user: null }))
);
