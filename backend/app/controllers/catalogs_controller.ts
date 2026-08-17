import Crop from '#models/crop'
import Harvest from '#models/harvest'

export default class CatalogsController {
  async harvests() {
    const harvests = await Harvest.query().select(['id', 'name']).orderBy('name', 'desc')
    return { data: harvests.map(({ id, name }) => ({ id, name })) }
  }

  async crops() {
    const crops = await Crop.query().select(['id', 'name']).orderBy('name', 'asc')
    return { data: crops.map(({ id, name }) => ({ id, name })) }
  }
}
