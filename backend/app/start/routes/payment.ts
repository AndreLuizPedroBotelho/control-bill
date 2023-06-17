import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.resource('payment', 'PaymentsController')
    .middleware({
      '*': 'auth',
      'create': 'isRequired',
    })
    .apiOnly()
}
