'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/', 'SiteController.index')
  Route.get('countries', 'UtilController.index')
  Route.get('last', 'LastController.index')
  Route.get('last/full', 'LastController.full')
  Route.get('last/join/:country', 'LastController.countries')
  Route.get('last/in/:country', 'LastController.country')

  Route.get('russia/last', 'RussiaController.index')
  Route.get('russia/last/full', 'RussiaController.full')

  Route.get('chart/:country', 'ChartController.index')
}).prefix('api/v1')
