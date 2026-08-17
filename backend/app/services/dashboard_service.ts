import db from '@adonisjs/lucid/services/db'

export default class DashboardService {
  async getData() {
    const summary = await db
      .from('farms')
      .count('* as total_farms')
      .sum({
        total_hectares: 'total_area',
        arable: 'arable_area',
        vegetation: 'vegetation_area',
      })
      .first()
    const farmsByState = await db
      .from('farms')
      .select('state')
      .count('* as total')
      .groupBy('state')
      .orderBy('state')
    const crops = await db
      .from('plantings')
      .join('crops', 'crops.id', 'plantings.crop_id')
      .select('crops.name as crop')
      .count('* as total')
      .groupBy('crops.id', 'crops.name')
      .orderBy('total', 'desc')

    return {
      summary: {
        totalFarms: Number(summary?.total_farms ?? 0),
        totalHectares: Number(summary?.total_hectares ?? 0),
      },
      charts: {
        farmsByState: farmsByState.map((item) => ({
          state: item.state,
          total: Number(item.total),
        })),
        crops: crops.map((item) => ({
          crop: item.crop,
          total: Number(item.total),
        })),
        landUse: [
          { type: 'Área agricultável', area: Number(summary?.arable ?? 0) },
          { type: 'Vegetação', area: Number(summary?.vegetation ?? 0) },
        ],
      },
    }
  }
}
