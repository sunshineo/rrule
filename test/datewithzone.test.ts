import { DateWithZone } from '../src/datewithzone'
import { expect } from 'chai'
import { set as setMockDate, reset as resetMockDate } from 'mockdate'
import { expectedDate } from './lib/utils'

describe('toString', () => {
  it('returns the date when no tzid is present', () => {
    const dt = new DateWithZone(new Date(Date.UTC(2010, 9, 5, 11, 0, 0)))
    expect(dt.toString()).to.equal(':20101005T110000Z')

    const dt2 = new DateWithZone(
      new Date(Date.UTC(2010, 9, 5, 11, 0, 0)),
      'UTC'
    )
    expect(dt2.toString()).to.equal(':20101005T110000Z')
  })

  it('returns the date with tzid when present', () => {
    const dt = new DateWithZone(
      new Date(Date.UTC(2010, 9, 5, 11, 0, 0)),
      'Asia/Tokyo'
    )
    expect(dt.toString()).to.equal(';TZID=Asia/Tokyo:20101005T110000')
  })
})

it('returns the time of the date', () => {
  const d = new Date(Date.UTC(2010, 9, 5, 11, 0, 0))
  const dt = new DateWithZone(d)
  expect(dt.getTime()).to.equal(d.getTime())
})

describe('rezonedDate', () => {
  it('returns the original date when no zone is given', () => {
    const d = new Date(Date.UTC(2010, 9, 5, 11, 0, 0))
    const dt = new DateWithZone(d)
    expect(dt.rezonedDate()).to.deep.equal(d)
  })

  it('returns the date in the correct zone when given', () => {
    const targetZone = 'America/New_York'
    const currentLocalDate = new Date(2000, 1, 6, 1, 0, 0)
    setMockDate(currentLocalDate)

    const d = new Date(Date.parse('20101005T110000'))
    const dt = new DateWithZone(d, targetZone)
    expect(dt.rezonedDate()).to.deep.equal(
      expectedDate(
        new Date(Date.parse('20101005T110000')),
        currentLocalDate,
        targetZone
      )
    )

    resetMockDate()
  })
})
