import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.resource('user', 'UsersController')
    .middleware({
      index: 'auth',
      update: 'auth',
      destroy: 'auth',
      show: 'auth',
      create: 'isRequired',
    })
    .apiOnly()
}
