import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { UserEffects } from './user/user.effect';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import {  StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MovieComponent } from './movie/movie.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';

export function localStorageSyncReducer(reducer: any): any {
  return (state:any, action:any) => {
    if (typeof localStorage !== 'undefined') {
      return localStorageSync({ keys: ['user'], rehydrate: true })(reducer)(state, action);
    }
    return reducer(state, action);
  };
}

const metaReducers: any = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MovieComponent,
    MovieReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot({ user: userReducer }, { metaReducers: [localStorageSyncReducer] }),

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
