# covid19.codeville.ru

With this REST-API you can get COVID-19 statistics (**data refreshes every hour**).

### Invalid or outdated data

Because we parse HTML pages with data, there can be situations when markup change and data not updated for some time. I'm continuosly watching for changes, but you can notify me by sending e-mail

### Usage

You can simply grab data with any http-request library you want, for example in PHP:

```php
<?php
  $curl = curl_init('https://covid19.codeville.ru/api/v1/countries');
  curl_setopt($curl, CURL_RETURNTRANSFER, true);
  $rawJson = curl_exec($curl);
  $data = json_decode($rawJson, true);
```

Also, if you want to use CORS with this API for server-less application please send me [e-mail](mailto:aloha@codeville.ru), i will add your host to acceptable CORS hosts list.

### Used data sources:

1. [worldometers.com](https://www.worldometers.info/coronavirus/)
1. [стопкоронавирус.рф](https://xn--80aesfpebagmfblc0a.xn--p1ai/)

### Routes:

All routes provides **updated** field which is latest data update JavaScript timestamp (with milliseconds), UTC

1. [api/v1/last](/api/v1/last) - endpoint returns latest global statistics
  ```javascript
  // Output:
  {
    updated: Number, // javascript timestamp (microseconds)
    // active cases data
    active: {
      cases, // total active cases
      mild,
      serious
    },
    // closed cases data
    closed: {
      cases, // total closed cases
      deaths,
      recovered
    }
  }
  ```

2. [api/v1/last/full](/api/v1/last/full) - endpoint returns global statistics and all countries data

  ```javascript
  // Output:
  {
    updated,
    data: {
      // See /last response object
    }
    countries: [
      // Country object
      {
        country: String, // Country name, English version
        casesTotal,
        casesNew,
        deathsTotal,
        recoveredTotal,
        activeCases,
        label: String // Country name, Russian version
      }
    ]
  }
  ```

3. [api/v1/last/in/<country_name>](/api/v1/last/in/russia) - endpoint returns data for only one country (ex: api/v1/last/in/russia)

  ```javascript
  // Output
  {
    updated
    country: {
      // See country object from /last/full
    }
  }
  ```

4. [api/v1/last/join/<country_name>,<country_name>](/api/v1/last/join/russia,usa) - endpoint returns data for selected countries separated by comma (ex: join/russia,usa,gb,germany)

  ```javascript
  // Output
  {
    updated,
    countries: [
      {
        // See country object from /last/full
      }
    ]
  }
  ```

5. [api/v1/chart/<country_name>](/api/v1/chart/russia) - endpoint returns data to create charts. Data splitted by day, \`dynamics\` contains diffs between days

  ```javascript
  // Output (!) ARRAY of objects
  [
    {
      // country object data
      updated,
      country,
      casesTotal,
      casesNew,
      deathsTotal,
      deathsNew,
      recoveredTotal,
      activeCases,
      // data dynamics object data
      dynamics: {
          deaths,
          cases,
          recovered
      }
    }
  ]
  ```

6. [api/v1/countries](/api/v1/countries) - endpoint returns countries array in format \`[ {name: Country_name, label: I18N_country_label}, ... ]\`

  ```javascript
  // Output (!) ARRAY of objects
  [
    {
      country, // English name
      label // Russian name
    }
  ]
  ```

7. [api/v1/russia/last](/api/v1/russia/last) - endpoint returns data for Russia (based on [стопкоронавирус.рф](https://xn--80aesfpebagmfblc0a.xn--p1ai/) data)

  ```javascript
  // Output
  {
  updated,
    cases,
    casesNew,
    recovered,
    recoveredNew,
    deaths,
    deathsNew,
    daily
  }
  ```

8. [api/v1/russia/last/full](/api/v1/russia/last/full) - endpoint returns data for covid-19 in Russian regions

  ```javascript
  // Output
  {
    updated,
    totals: {
      // See result of /russia/last response object
    },
    regions: [
      {
        name, // Region name (RU)
        cases,
        recovered,
        deaths
      }
    ]
  }
  ```