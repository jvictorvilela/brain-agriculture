import catalogsReducer from '@/store/catalogsSlice'
import dashboardReducer from '@/store/dashboardSlice'
import producersReducer from '@/store/producersSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    producers: producersReducer,
    catalogs: catalogsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
