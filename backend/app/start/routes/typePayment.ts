import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.resource('typePayment', 'TypePaymentsController')
    .middleware({
      '*': 'auth',
    })
    .apiOnly()
}
