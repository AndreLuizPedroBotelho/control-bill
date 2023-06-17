import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.resource('bill', 'BillsController')
    .middleware({
      '*': 'auth',
    })
    .apiOnly()
}
