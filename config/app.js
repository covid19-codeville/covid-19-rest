'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Application Name
  |--------------------------------------------------------------------------
  |
  | This value is the name of your application and can used when you
  | need to place the application's name in a email, view or
  | other location.
  |
  */

  name: Env.get('APP_NAME', 'AdonisJs'),

  about: `# covid19.codeville.ru

With this REST-API you can get actual information about COVID-19 statistics.

If you want to use CORS with this API (there are restrictions by domains), or you have any questions or ideas, please send me [e-mail](mailto:aloha@codeville.ru)

Used sources:
  1. [worldometers.com](https://www.worldometers.info/coronavirus/)

Routes:

1. [api/v1/last](https://covid19.codeville.ru/api/v1/last) - endpoint returns latest global statistics
1. [api/v1/last/full](https://covid19.codeville.ru/api/v1/last) - endpoint returns global statistics and all countries data
1. [api/v1/last/in/<country_name>](https://covid19.codeville.ru/api/v1/last/in/russia) - endpoint returns data for only one country (ex: api/v1/last/in/russia)
1. [api/v1/last/join/<country_name>,<country_name>](https://covid19.codeville.ru/api/v1/last/join/russia,usa) - endpoint returns data for selected countries separated by comma (ex: join/russia,usa,gb,germany)
1. [api/v1/chart/<country_name>](https://covid19.codeville.ru/api/v1/chart/russia) - endpoint returns data to create charts. Data splitted by day, \`dynamics\` contains diffs between days
1. [api/v1/countries](https://covid19.codeville.ru/api/v1/countries) - endpoint returns countries array in format \`[ {name: Country_name, label: I18N_country_label}, ... ]\`

All endpoints returns data in object format:
{
  updated: Integer,
  ...data...
}

**update** is latest update JavaScript timestamp (with milliseconds), UTC
`,

  /*
  |--------------------------------------------------------------------------
  | App Key
  |--------------------------------------------------------------------------
  |
  | App key is a randomly generated 16 or 32 characters long string required
  | to encrypt cookies, sessions and other sensitive data.
  |
  */
  appKey: Env.getOrFail('APP_KEY'),

  http: {
    /*
    |--------------------------------------------------------------------------
    | Allow Method Spoofing
    |--------------------------------------------------------------------------
    |
    | Method spoofing allows to make requests by spoofing the http verb.
    | Which means you can make a GET request but instruct the server to
    | treat as a POST or PUT request. If you want this feature, set the
    | below value to true.
    |
    */
    allowMethodSpoofing: true,

    /*
    |--------------------------------------------------------------------------
    | Trust Proxy
    |--------------------------------------------------------------------------
    |
    | Trust proxy defines whether X-Forwarded-* headers should be trusted or not.
    | When your application is behind a proxy server like nginx, these values
    | are set automatically and should be trusted. Apart from setting it
    | to true or false Adonis supports handful or ways to allow proxy
    | values. Read documentation for that.
    |
    */
    trustProxy: false,

    /*
    |--------------------------------------------------------------------------
    | Subdomains
    |--------------------------------------------------------------------------
    |
    | Offset to be used for returning subdomains for a given request.For
    | majority of applications it will be 2, until you have nested
    | sudomains.
    | cheatsheet.adonisjs.com      - offset - 2
    | virk.cheatsheet.adonisjs.com - offset - 3
    |
    */
    subdomainOffset: 2,

    /*
    |--------------------------------------------------------------------------
    | JSONP Callback
    |--------------------------------------------------------------------------
    |
    | Default jsonp callback to be used when callback query string is missing
    | in request url.
    |
    */
    jsonpCallback: 'callback',


    /*
    |--------------------------------------------------------------------------
    | Etag
    |--------------------------------------------------------------------------
    |
    | Set etag on all HTTP response. In order to disable for selected routes,
    | you can call the `response.send` with an options object as follows.
    |
    | response.send('Hello', { ignoreEtag: true })
    |
    */
    etag: false
  },

  views: {
    /*
    |--------------------------------------------------------------------------
    | Cache Views
    |--------------------------------------------------------------------------
    |
    | Define whether or not to cache the compiled view. Set it to true in
    | production to optimize view loading time.
    |
    */
    cache: Env.get('CACHE_VIEWS', true)
  },

  static: {
    /*
    |--------------------------------------------------------------------------
    | Dot Files
    |--------------------------------------------------------------------------
    |
    | Define how to treat dot files when trying to server static resources.
    | By default it is set to ignore, which will pretend that dotfiles
    | does not exists.
    |
    | Can be one of the following
    | ignore, deny, allow
    |
    */
    dotfiles: 'ignore',

    /*
    |--------------------------------------------------------------------------
    | ETag
    |--------------------------------------------------------------------------
    |
    | Enable or disable etag generation
    |
    */
    etag: true,

    /*
    |--------------------------------------------------------------------------
    | Extensions
    |--------------------------------------------------------------------------
    |
    | Set file extension fallbacks. When set, if a file is not found, the given
    | extensions will be added to the file name and search for. The first
    | that exists will be served. Example: ['html', 'htm'].
    |
    */
    extensions: false
  },

  locales: {
    /*
    |--------------------------------------------------------------------------
    | Loader
    |--------------------------------------------------------------------------
    |
    | The loader to be used for fetching and updating locales. Below is the
    | list of available options.
    |
    | file, database
    |
    */
    loader: 'file',

    /*
    |--------------------------------------------------------------------------
    | Default Locale
    |--------------------------------------------------------------------------
    |
    | Default locale to be used by Antl provider. You can always switch drivers
    | in runtime or use the official Antl middleware to detect the driver
    | based on HTTP headers/query string.
    |
    */
    locale: 'en'
  },

  logger: {
    /*
    |--------------------------------------------------------------------------
    | Transport
    |--------------------------------------------------------------------------
    |
    | Transport to be used for logging messages. You can have multiple
    | transports using same driver.
    |
    | Available drivers are: `file` and `console`.
    |
    */
    transport: 'console',

    /*
    |--------------------------------------------------------------------------
    | Console Transport
    |--------------------------------------------------------------------------
    |
    | Using `console` driver for logging. This driver writes to `stdout`
    | and `stderr`
    |
    */
    console: {
      driver: 'console',
      name: 'adonis-app',
      level: 'info'
    },

    /*
    |--------------------------------------------------------------------------
    | File Transport
    |--------------------------------------------------------------------------
    |
    | File transport uses file driver and writes log messages for a given
    | file inside `tmp` directory for your app.
    |
    | For a different directory, set an absolute path for the filename.
    |
    */
    file: {
      driver: 'file',
      name: 'adonis-app',
      filename: 'adonis.log',
      level: 'info'
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Generic Cookie Options
  |--------------------------------------------------------------------------
  |
  | The following cookie options are generic settings used by AdonisJs to create
  | cookies. However, some parts of the application like `sessions` can have
  | separate settings for cookies inside `config/session.js`.
  |
  */
  cookie: {
    httpOnly: true,
    sameSite: false,
    path: '/',
    maxAge: 7200
  }
}
