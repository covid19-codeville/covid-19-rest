/*
  Data hacks
*/
module.exports = {
  /*
    Changed schema in redis. Was [] now {updated: Num, countries: []}
  */
  parseCountries (json = '') {
    const countries = JSON.parse(json)

    if (countries instanceof Array) {
      return {
        countries
      }
    }

    return countries
  }
}
