import Crop from '#models/crop'
import Farm from '#models/farm'
import Harvest from '#models/harvest'
import Planting from '#models/planting'
import RuralProducer from '#models/rural_producer'
import db from '@adonisjs/lucid/services/db'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

type PlantingSeed = {
  harvest: string
  crops: string[]
}

type FarmSeed = {
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  plantings: PlantingSeed[]
}

type ProducerSeed = {
  document: string
  name: string
  farms: FarmSeed[]
}

const producers: ProducerSeed[] = [
  {
    document: '52998224725',
    name: 'Maria da Silva',
    farms: [
      {
        name: 'Fazenda Boa Esperança',
        city: 'Ribeirão Preto',
        state: 'SP',
        totalArea: 1200.5,
        arableArea: 850,
        vegetationArea: 300.5,
        plantings: [
          { harvest: 'Safra 2024/2025', crops: ['Soja', 'Milho'] },
          { harvest: 'Safra 2025/2026', crops: ['Soja'] },
        ],
      },
      {
        name: 'Sítio Santa Clara',
        city: 'Uberaba',
        state: 'MG',
        totalArea: 480,
        arableArea: 300,
        vegetationArea: 150,
        plantings: [
          { harvest: 'Safra 2024/2025', crops: ['Café'] },
          { harvest: 'Safra 2025/2026', crops: ['Café'] },
        ],
      },
    ],
  },
  {
    document: '11144477735',
    name: 'João Oliveira',
    farms: [
      {
        name: 'Fazenda Pampa',
        city: 'Alegrete',
        state: 'RS',
        totalArea: 2500,
        arableArea: 1600,
        vegetationArea: 800,
        plantings: [{ harvest: 'Safra 2025/2026', crops: ['Trigo', 'Soja'] }],
      },
    ],
  },
  {
    document: '93541134780',
    name: 'Ana Pereira',
    farms: [],
  },
  {
    document: '11222333000181',
    name: 'Cooperativa Horizonte',
    farms: [
      {
        name: 'Fazenda Horizonte',
        city: 'Rio Verde',
        state: 'GO',
        totalArea: 5000,
        arableArea: 3800,
        vegetationArea: 1000,
        plantings: [
          { harvest: 'Safra 2024/2025', crops: ['Soja', 'Milho'] },
          { harvest: 'Safra 2025/2026', crops: ['Soja', 'Algodão'] },
        ],
      },
      {
        name: 'Fazenda Pantanal',
        city: 'Rondonópolis',
        state: 'MT',
        totalArea: 3200,
        arableArea: 2400,
        vegetationArea: 650,
        plantings: [{ harvest: 'Safra 2025/2026', crops: ['Soja', 'Algodão'] }],
      },
    ],
  },
  {
    document: '19131243000197',
    name: 'Agro Cerrado Ltda.',
    farms: [
      {
        name: 'Fazenda Veredas',
        city: 'Barreiras',
        state: 'BA',
        totalArea: 4100,
        arableArea: 3000,
        vegetationArea: 900,
        plantings: [
          { harvest: 'Safra 2024/2025', crops: ['Milho'] },
          { harvest: 'Safra 2025/2026', crops: ['Soja', 'Milho'] },
        ],
      },
    ],
  },
]

export default class DemoSeeder extends BaseSeeder {
  static environment = ['development']

  async run() {
    await db.transaction(async (trx) => {
      for (const producerSeed of producers) {
        const producer = await RuralProducer.updateOrCreate(
          { document: producerSeed.document },
          { name: producerSeed.name },
          { client: trx }
        )

        for (const farmSeed of producerSeed.farms) {
          const { plantings, ...farmData } = farmSeed
          const farm = await Farm.updateOrCreate(
            { producerId: producer.id, name: farmSeed.name },
            farmData,
            { client: trx }
          )

          for (const plantingSeed of plantings) {
            const harvest = await this.findOrCreateHarvest(plantingSeed.harvest, trx)

            for (const cropName of plantingSeed.crops) {
              const crop = await this.findOrCreateCrop(cropName, trx)
              await Planting.firstOrCreate(
                { farmId: farm.id, harvestId: harvest.id, cropId: crop.id },
                {},
                { client: trx }
              )
            }
          }
        }
      }
    })
  }

  private async findOrCreateHarvest(name: string, client: typeof this.client) {
    return (
      (await Harvest.query({ client }).whereILike('name', name).first()) ??
      (await Harvest.create({ name }, { client }))
    )
  }

  private async findOrCreateCrop(name: string, client: typeof this.client) {
    return (
      (await Crop.query({ client }).whereILike('name', name).first()) ??
      (await Crop.create({ name }, { client }))
    )
  }
}
