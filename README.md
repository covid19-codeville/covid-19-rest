# covid19.codeville.ru

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