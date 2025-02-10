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
const SavedExperiencesController = () => import('#controllers/saved_experiences_controller')
const ExperienceHighlightsController = () => import('#controllers/experience_highlights_controller')
const ExperienceFeedbacksController = () => import('#controllers/experience_feedbacks_controller')
const ExperienceBookingsController = () => import('#controllers/experience_bookings_controller')
const ExperienceDatesController = () => import('#controllers/experience_dates_controller')
const VendorsController = () => import('#controllers/vendors_controller')
const ExperiencesController = () => import('#controllers/experiences_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    // USERS
    router
      .group(() => {
        router.post('/register', [UsersController, 'store'])
        router.post('/login', [UsersController, 'login'])
        router
          .post('/logout', [UsersController, 'logout'])
          .use(middleware.auth({ guards: ['api'] }))
      })
      .prefix('/users/auth')

    // VENDORS

    router.get('/vendors', [VendorsController, 'index'])
    router.post('/vendors', [VendorsController, 'store'])
    router.get('/vendors/:id', [VendorsController, 'show'])
    router.put('/vendors/:id', [VendorsController, 'update'])
    router.delete('/vendors/:id', [VendorsController, 'destroy'])

    // EXPERIENCE CATEGORIES

    router.get('/experience-categories', [ExperiencesController, 'index'])

    // EXPERIENCE

    router.get('/experiences', [ExperiencesController, 'index'])
    router.post('/experiences', [ExperiencesController, 'store'])
    router.get('/experiences/:id', [ExperiencesController, 'show'])
    router.put('/experiences/:id', [ExperiencesController, 'update'])
    router.delete('/experiences/:id', [ExperiencesController, 'destroy'])

    // EXPERIENCE DATES

    router.get('/experience-dates', [ExperienceDatesController, 'index'])
    router.post('/experience-dates', [ExperienceDatesController, 'store'])
    router.get('/experience-dates/:id', [ExperienceDatesController, 'show'])
    router.put('/experience-dates/:id', [ExperienceDatesController, 'update'])
    router.delete('/experience-dates/:id', [ExperienceDatesController, 'destroy'])

    // EXPERIENCE BOOKINGS
    router.get('/experience-bookings', [ExperienceBookingsController, 'index'])
    router.post('/experience-bookings', [ExperienceBookingsController, 'store'])
    router.get('/experience-bookings/:id', [ExperienceBookingsController, 'show'])
    router.put('/experience-bookings/:id', [ExperienceBookingsController, 'update'])
    router.delete('/experience-bookings/:id', [ExperienceBookingsController, 'destroy'])

    // EXPERIENCE FEEDBACKS
    router.get('/experience-feedbacks', [ExperienceFeedbacksController, 'index'])
    router.post('/experience-feedbacks', [ExperienceFeedbacksController, 'store'])
    router.get('/experience-feedbacks/:id', [ExperienceFeedbacksController, 'show'])
    router.put('/experience-feedbacks/:id', [ExperienceFeedbacksController, 'update'])
    router.delete('/experience-feedbacks/:id', [ExperienceFeedbacksController, 'destroy'])

    // EXPERIENCE HIGHLIGHTS
    router.get('/experience-highlights', [ExperienceHighlightsController, 'index'])
    router.post('/experience-highlights', [ExperienceHighlightsController, 'store'])
    router.get('/experience-highlights/:id', [ExperienceHighlightsController, 'show'])
    router.put('/experience-highlights/:id', [ExperienceHighlightsController, 'update'])
    router.delete('/experience-highlights/:id', [ExperienceHighlightsController, 'destroy'])

    // SAVE EXPERIENCE
    router
      .group(() => {
        router.get('users/:id/saved-experiences', [SavedExperiencesController, 'index'])
        router.post('users/:id/saved-experiences', [SavedExperiencesController, 'store'])
        router.delete('users/:id/saved-experiences/:saved_experience_id', [
          SavedExperiencesController,
          'destroy',
        ])
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api/v1')
