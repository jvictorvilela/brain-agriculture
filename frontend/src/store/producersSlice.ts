import { api, getErrorMessage } from '@/services/api'
import type {
  AsyncStatus,
  Farm,
  FarmInput,
  PaginationMeta,
  Planting,
  PlantingInput,
  Producer,
  ProducerInput,
} from '@/types/domain'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

type ProducersState = {
  items: Producer[]
  selected: Producer | null
  pagination: PaginationMeta | null
  status: AsyncStatus
  detailStatus: AsyncStatus
  mutationStatus: AsyncStatus
  error: string | null
}

const initialState: ProducersState = {
  items: [],
  selected: null,
  pagination: null,
  status: 'idle',
  detailStatus: 'idle',
  mutationStatus: 'idle',
  error: null,
}

type Reject = { rejectValue: string }

export const fetchProducers = createAsyncThunk<
  { data: Producer[]; meta: PaginationMeta },
  { page?: number; search?: string },
  Reject
>('producers/list', async ({ page = 1, search = '' }, { rejectWithValue }) => {
  try {
    return await api.listProducers(page, search)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const fetchProducer = createAsyncThunk<Producer, number, Reject>(
  'producers/detail',
  async (id, { rejectWithValue }) => {
    try {
      return (await api.getProducer(id)).data
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const createProducer = createAsyncThunk<Producer, ProducerInput, Reject>(
  'producers/create',
  async (input, { rejectWithValue }) => {
    try {
      return (await api.createProducer(input)).data
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const updateProducer = createAsyncThunk<
  Producer,
  { id: number; input: Partial<ProducerInput> },
  Reject
>('producers/update', async ({ id, input }, { rejectWithValue }) => {
  try {
    return (await api.updateProducer(id, input)).data
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const deleteProducer = createAsyncThunk<number, number, Reject>(
  'producers/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteProducer(id)
      return id
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const createFarm = createAsyncThunk<
  Farm,
  { producerId: number; input: FarmInput },
  Reject
>(
  'producers/createFarm',
  async ({ producerId, input }, { rejectWithValue }) => {
    try {
      return (await api.createFarm(producerId, input)).data
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const updateFarm = createAsyncThunk<
  Farm,
  { id: number; input: FarmInput },
  Reject
>('producers/updateFarm', async ({ id, input }, { rejectWithValue }) => {
  try {
    return (await api.updateFarm(id, input)).data
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const deleteFarm = createAsyncThunk<number, number, Reject>(
  'producers/deleteFarm',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteFarm(id)
      return id
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const createPlanting = createAsyncThunk<
  Planting,
  { farmId: number; input: PlantingInput },
  Reject
>(
  'producers/createPlanting',
  async ({ farmId, input }, { rejectWithValue }) => {
    try {
      return (await api.createPlanting(farmId, input)).data
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const deletePlanting = createAsyncThunk<number, number, Reject>(
  'producers/deletePlanting',
  async (id, { rejectWithValue }) => {
    try {
      await api.deletePlanting(id)
      return id
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

const producersSlice = createSlice({
  name: 'producers',
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = null
      state.detailStatus = 'idle'
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.data
        state.pagination = action.payload.meta
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? 'Não foi possível carregar os produtores'
      })
      .addCase(fetchProducer.pending, (state) => {
        state.detailStatus = 'loading'
        state.error = null
      })
      .addCase(fetchProducer.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selected = action.payload
      })
      .addCase(fetchProducer.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.payload ?? 'Não foi possível carregar o produtor'
      })
      .addCase(updateProducer.fulfilled, (state, action) => {
        state.selected = { ...state.selected, ...action.payload }
      })
      .addCase(deleteProducer.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
        state.selected = null
      })
      .addMatcher(
        isAnyOf(
          createProducer.pending,
          updateProducer.pending,
          deleteProducer.pending,
          createFarm.pending,
          updateFarm.pending,
          deleteFarm.pending,
          createPlanting.pending,
          deletePlanting.pending
        ),
        (state) => {
          state.mutationStatus = 'loading'
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          createProducer.fulfilled,
          updateProducer.fulfilled,
          deleteProducer.fulfilled,
          createFarm.fulfilled,
          updateFarm.fulfilled,
          deleteFarm.fulfilled,
          createPlanting.fulfilled,
          deletePlanting.fulfilled
        ),
        (state) => {
          state.mutationStatus = 'succeeded'
        }
      )
      .addMatcher(
        isAnyOf(
          createProducer.rejected,
          updateProducer.rejected,
          deleteProducer.rejected,
          createFarm.rejected,
          updateFarm.rejected,
          deleteFarm.rejected,
          createPlanting.rejected,
          deletePlanting.rejected
        ),
        (state, action) => {
          state.mutationStatus = 'failed'
          state.error = action.payload ?? 'Não foi possível concluir a operação'
        }
      )
  },
})

export const { clearSelected, clearError } = producersSlice.actions
export default producersSlice.reducer
