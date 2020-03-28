const { all } = use('App/Helpers/countries-i18n')

class UtilController {
  async index () {
    const countriesObj = all()
    return Object.keys(countriesObj).map(name => ({
      name,
      label: countriesObj[name]
    }))
  }
}

module.exports = UtilController
