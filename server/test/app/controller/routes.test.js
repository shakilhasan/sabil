const contactRouter = require('../../../src/routes/contact-route');

describe('Routes', () => {

  // contact routes setup ok
  test('contact routes setup ok', () => {
    const routes = contactRouter.stack
      .filter(layer => layer.route)
      .map(layer => layer.route.path);
    expect(routes.includes('/search')).toBe(true)
  })

})

