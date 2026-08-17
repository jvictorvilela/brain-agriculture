import DashboardService from '#services/dashboard_service'

export default class DashboardController {
  private readonly service = new DashboardService()

  async show() {
    return { data: await this.service.getData() }
  }
}
