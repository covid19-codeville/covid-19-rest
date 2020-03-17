const Redis = use('Redis')

class LastController {

  async index () {
    const [ data = null ] = await Redis.zrevrange('cv19', 0, 1)

    if (data) {
      const json = JSON.parse(data)
      return {
        active: json.active,
        closed: json.closed
      }
    }

    return {}
  }

  async full () {
    const [ data = null ] = await Redis.zrevrange('cv19', 0, 1)

    if (data) {
      return JSON.parse(data)
    }

    return {}
  }

  async country ({ request }) {
    const { country = null } = request.params

    if (country) {
      const [ data = null ] = await Redis.zrevrange('cv19', 0, 1)
      if (data) {
        const json = JSON.parse(data)
        const countryInfo = json.countries.filter(countryObj => {
          return countryObj.country.toLowerCase().localeCompare(country.toLowerCase()) === 0
        })

        return countryInfo.shift() || {}
      }
    }

    return {}
  }
}

module.exports = LastController
