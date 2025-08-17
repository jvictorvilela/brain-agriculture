import { api, getErrorMessage } from '@/services/api'
import type { AsyncStatus, CatalogItem } from '@/types/domain'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type CatalogsState = {
  harvests: CatalogItem[]
  crops: CatalogItem[]
  status: AsyncStatus
  error: string | null
}

const initialState: CatalogsState = {
  harvests: [],
  crops: [],
  status: 'idle',
  error: null,
}

export const fetchCatalogs = createAsyncThunk<
  { harvests: CatalogItem[]; crops: CatalogItem[] },
  void,
  { rejectValue: string }
>('catalogs/fetch', async (_, { rejectWithValue }) => {
  try {
    const [harvests, crops] = await Promise.all([
      api.listHarvests(),
      api.listCrops(),
    ])
    return { harvests: harvests.data, crops: crops.data }
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

const catalogsSlice = createSlice({
  name: 'catalogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogs.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCatalogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.harvests = action.payload.harvests
        state.crops = action.payload.crops
      })
      .addCase(fetchCatalogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Não foi possível carregar os catálogos'
      })
  },
})

export default catalogsSlice.reducer
