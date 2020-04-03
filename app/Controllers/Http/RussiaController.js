const Redis = use('Redis')
const Sentry = use('Sentry')
const { parseAreas } = use('App/Helpers/DataHelper')

class RussiaController {
  async index () {
    const [ data = '{}', updated = 0 ] = await Redis.zrevrange('cv19:ru_totals', 0, 1, 'WITHSCORES')

    try {
      return {
        updated: parseInt(updated),
        ...JSON.parse(data)
      }
    }
    catch (e) {
      Sentry.captureException(e)
      return {}
    }
  }

  async full () {
    const [ totalsJSON = '{}', updated = 0 ] = await Redis.zrevrange('cv19:ru_totals', 0, 1, 'WITHSCORES')
    const [ areasJSON = '{}' ] = await Redis.zrevrange('cv19:ru_areas', 0, 1)

    try {
      const totals = JSON.parse(totalsJSON)
      const { areas: regions } = parseAreas(areasJSON)

      return {
        updated: parseInt(updated),
        totals,
        regions
      }
    }
    catch (err) {
      console.log(err)
      Sentry.captureException(err)
      return {}
    }
  }
}

module.exports = RussiaController
