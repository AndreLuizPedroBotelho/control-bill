import paymentRoute from './routes/payment'
import billRoute from './routes/bill'
import typePaymentRoute from './routes/typePayment'
import userRoute from './routes/user'
import loginRoute from './routes/login'

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  userRoute()
  typePaymentRoute()
  paymentRoute()
  billRoute()
  loginRoute()
}).prefix('/api')
