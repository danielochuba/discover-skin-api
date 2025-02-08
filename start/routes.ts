/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// // returns swagger in YAML
// router.get('/swagger', async () => {
//   return AutoSwagger.default.docs(router.toJSON(), swagger)
// })

// // Renders Swagger-UI and passes YAML-output of /swagger
// router.get('/docs', async () => {
//   return AutoSwagger.default.ui('/swagger', swagger)
//   // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
//   // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
// })

router
  .group(() => {
    router.post('/users', [UsersController, 'store'])
    router.post('/login', [UsersController, 'login'])
    router.get('/users', [UsersController, 'index'])
    router
      .post('/users/logout', [UsersController, 'logout'])
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api/v1')
