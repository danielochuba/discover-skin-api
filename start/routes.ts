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
const VendorsController = () => import('#controllers/vendors_controller')
const ExperiencesController = () => import('#controllers/experiences_controller')
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

    // VENDORS

    router.get('/vendors', [VendorsController, 'index'])
    router.post('/vendors', [VendorsController, 'store'])
    router.get('/vendors/:id', [VendorsController, 'show'])
    router.put('/vendors/:id', [VendorsController, 'update'])
    router.delete('/vendors/:id', [VendorsController, 'destroy'])

    // EXPERIENCE

    router.get('/experiences', [ExperiencesController, 'index'])
    router.post('/experiences', [ExperiencesController, 'store'])
    router.get('/experiences/:id', [ExperiencesController, 'show'])
    router.put('/experiences/:id', [ExperiencesController, 'update'])
    router.delete('/experiences/:id', [ExperiencesController, 'destroy'])
  })
  .prefix('api/v1')
