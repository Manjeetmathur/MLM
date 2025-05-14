import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import authReducer from './authSlice';

// Redux Persist configuration
const persistConfig = {
       key: 'root',
       storage,
};

// Wrap the reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create the store
export const store = configureStore({
       reducer: {
              auth: persistedReducer,
       },
       middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware({
                     serializableCheck: {
                            ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
                     },
              }),
});

// Create the persistor
export const persistor = persistStore(store);