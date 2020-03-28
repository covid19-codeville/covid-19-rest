const sentry = use('Sentry')

const i18n = require('./i18n.json')

module.exports = {
  t: country => {
    if (i18n[country]) {
      return i18n[country]
    }
    else {
      sentry.captureException(new Error(`Country translation not found for ${country}`))
      return country
    }
  },
  all: () => {
    return i18n
  }
}
