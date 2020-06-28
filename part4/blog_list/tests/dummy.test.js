const listHelper = require('../utils/list_helper')

test('summy returns one', () => {
  const blogs = []

  expect(listHelper.dummy(blogs)).toBe(1)
})