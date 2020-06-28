const { TestScheduler } = require('jest')

const palindrome = require('../utils/for_testing').palindrome
describe('palindrome', () => {
  test('palindrome of a', () => {
    expect(palindrome('a')).toBe('a')
  })

  test('palindrome of react', () => {
    expect(palindrome('react')).toBe('tcaer')
  })

  test('palindrome of releveler', () => {
    expect(palindrome('releveler')).toBe('releveler')
  })

  test('Palindrome of god', () => {
    expect(palindrome('god')).toBe('dog')
  })
})