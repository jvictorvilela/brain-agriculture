import { api, getErrorMessage } from '@/services/api'
import type { AsyncStatus, DashboardData } from '@/types/domain'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type DashboardState = {
  data: DashboardData | null
  status: AsyncStatus
  error: string | null
}

const initialState: DashboardState = {
  data: null,
  status: 'idle',
  error: null,
}

export const fetchDashboard = createAsyncThunk<
  DashboardData,
  void,
  { rejectValue: string }
>('dashboard/fetch', async (_, { rejectWithValue }) => {
  try {
    return (await api.dashboard()).data
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Não foi possível carregar o dashboard'
      })
  },
})

export default dashboardSlice.reducer
