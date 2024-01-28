import {configureStore} from '@reduxjs/toolkit';
import EmailSlice from './AuthSlice';
import { authApi } from './AuthApi';
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    email: EmailSlice,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
    .concat(authApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
