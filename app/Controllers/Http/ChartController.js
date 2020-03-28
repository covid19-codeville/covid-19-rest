const Redis = use('Redis')

class ChartController {
  /*
    Chart data by country
  */
  async index ({ request }) {
    const { country = null } = request.params

    const countryName = decodeURIComponent(country).toLowerCase()

    if (!countryName) {
      return []
    }

    const items = await Redis.zrange('cv19:countries', 0, -1, 'WITHSCORES')

    try {
      const rawData = []
      let i = 0

      for (; i < items.length; i++) {
        if (i % 2 !== 0) {
          continue
        }

        const updated = parseInt(items[i + 1])
        const hour = (new Date(updated)).getUTCHours()

        if (hour < 23) {
          continue
        }

        const countries = JSON.parse(items[i])
        const countryObj = countries.find(countryObj => {
          return countryObj.country.toLowerCase().localeCompare(countryName) === 0
        })

        rawData.push({
          updated,
          ...countryObj
        })
      }

      return rawData.map((obj, index) => ({
        ...obj,
        dynamics: {
          deaths: index > 0 ? rawData[index].deathsTotal - rawData[index - 1].deathsTotal : 0,
          cases: index > 0 ? rawData[index].casesTotal - rawData[index - 1].casesTotal : 0,
          recovered: index > 0 ? rawData[index].recoveredTotal - rawData[index - 1].recoveredTotal : 0
        }
      }))
    }
    catch (e) {
      console.error(e)
    }

    return []
  }
}

module.exports = ChartController
