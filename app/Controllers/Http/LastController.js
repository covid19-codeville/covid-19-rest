const Redis = use('Redis')

class LastController {

  async index () {
    const [ data = '{}' ] = await Redis.zrevrange('cv19:data', 0, 1)

    if (data) {
      const { active = null, closed = null } = JSON.parse(data)
      return {
        active,
        closed
      }
    }

    return {}
  }

  async full () {
    const [ dataJSON = '{}' ] = await Redis.zrevrange('cv19:data', 0, 1)
    const [ countriesJSON = '[]' ] = await Redis.zrevrange('cv19:countries', 0, 1)

    const data = JSON.parse(dataJSON)
    const countries = JSON.parse(countriesJSON)

    if (data) {
      return {
        data,
        countries
      }
    }

    return {}
  }

  async country ({ request }) {
    const result = await this.countries({ request })

    if (result.length > 0) {
      return result.shift()
    }

    return {}
  }

  async countries ({ request }) {
    const { country = null } = request.params

    if (country) {
      const result = this._findCountries(country)
      return result
    }

    return []
  }

  async _findCountries (filter = '') {
    const countriesReq = decodeURIComponent(filter).split(',')
    const [ data ] = await Redis.zrevrange('cv19:countries', 0, 1)
    if (data) {
      const countries = JSON.parse(data)
      const countryInfo = countries.filter(countryObj => {
        return countriesReq.some(country => {
          return countryObj.country.toLowerCase().localeCompare(country.toLowerCase()) === 0
        })
      })

      return countryInfo
    }

    return []
  }
}

module.exports = LastController
