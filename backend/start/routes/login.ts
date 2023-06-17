import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.post('login', 'LoginController.login')
}
