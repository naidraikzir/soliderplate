import * as v from 'valibot'

import { m } from './paraglide/messages'

v.setSpecificMessage(v.string, m['errors.string']({ name: m['field']() }), 'custom')
v.setSpecificMessage(v.nonEmpty, m['errors.nonEmpty']({ name: m['field']() }), 'custom')
v.setSpecificMessage(
  v.minLength,
  ({ requirement }) => m['errors.minLength']({ name: m['field'](), min: requirement }),
  'custom',
)
v.setSpecificMessage(v.isoTimestamp, m['errors.isoTimestamp']({ name: m['field']() }), 'custom')

v.setGlobalConfig({ lang: 'custom' })
