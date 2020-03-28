const { all } = use('App/Helpers/countries-i18n')

class UtilController {
  async index () {
    return all()
  }
}

module.exports = UtilController
