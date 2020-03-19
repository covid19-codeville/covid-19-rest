const Config = use('Config')

class SiteController {
  async index () {
    return Config.get('app.about', '')
  }
}

module.exports = SiteController
