import * as v from 'valibot'

import { m } from './paraglide/messages'

v.setSpecificMessage(v.string, m['errors.string']({ name: 'This field' }), 'custom')
v.setSpecificMessage(v.nonEmpty, m['errors.nonEmpty']({ name: 'This field' }), 'custom')
v.setSpecificMessage(
  v.minLength,
  ({ requirement }) => m['errors.minLength']({ name: 'This field', min: requirement }),
  'custom',
)
v.setSpecificMessage(v.isoTimestamp, m['errors.isoTimestamp']({ name: 'This field' }), 'custom')

v.setGlobalConfig({ lang: 'custom' })
