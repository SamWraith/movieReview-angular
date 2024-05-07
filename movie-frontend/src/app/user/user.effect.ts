import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';
import * as UserActions from './user.actions';
import { User } from './user.model';

@Injectable()
export class UserEffects {
    
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.login),
            switchMap(({ user }) =>
                this.authService.login(user.email,user.password).pipe(
                    map((user: User) => UserActions.loadUserSuccess({ user })),
                    catchError(error => of(UserActions.loadUserFailure({ error })))
                )
            )
        )
    );
    

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
