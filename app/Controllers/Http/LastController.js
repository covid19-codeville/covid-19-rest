const Redis = use('Redis')
const { t } = use('App/Helpers/countries-i18n')

class LastController {

  async index () {
    const [ data = '{}', updated = 0 ] = await Redis.zrevrange('cv19:data', 0, 1, 'WITHSCORES')

    if (data) {
      const { active = null, closed = null } = JSON.parse(data)
      return {
        updated: parseInt(updated),
        active,
        closed
      }
    }

    return {}
  }

  async full () {
    const [ dataJSON = '{}', updated = 0 ] = await Redis.zrevrange('cv19:data', 0, 1, 'WITHSCORES')
    const [ countriesJSON = '[]' ] = await Redis.zrevrange('cv19:countries', 0, 1)

    const data = JSON.parse(dataJSON)
    const countries = JSON.parse(countriesJSON)

    if (data) {
      return {
        updated: parseInt(updated),
        data,
        countries: countries.map(countryObj => ({
          ...countryObj,
          label: t(countryObj.country)
        }))
      }
    }

    return {}
  }

  async country ({ request }) {
    const result = await this.countries({ request })

    if (result.updated) {
      return {
        updated: result.updated,
        items: result.items.shift()
      }
    }

    return {}
  }

  async countries ({ request }) {
    const { country = null } = request.params

    if (country) {
      const result = this._findCountries(country)
      return result
    }

    return {}
  }

  async _findCountries (filter = '') {
    const countriesReq = decodeURIComponent(filter).split(',')
    const [ data, updated ] = await Redis.zrevrange('cv19:countries', 0, 1, 'WITHSCORES')

    if (data) {
      const countries = JSON.parse(data)
      const countryInfo = countries.filter(countryObj => {
        return countriesReq.some(country => {
          return countryObj.country.toLowerCase().trim().localeCompare(country.toLowerCase()) === 0
        })
      })
        .map(countryObj => ({
          ...countryObj,
          label: t(countryObj.country)
        }))

      return {
        updated: parseInt(updated),
        items: countryInfo
      }
    }

    return []
  }
}

module.exports = LastController
