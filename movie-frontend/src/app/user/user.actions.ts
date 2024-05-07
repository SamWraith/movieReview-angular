import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const login = createAction(
    '[User] Login',
  props<{ user: User }>()
    );
export const logout = createAction('[User] Logout');
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);
