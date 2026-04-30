import * as v from 'valibot'

v.setSpecificMessage(v.string, 'Required', 'custom')
v.setSpecificMessage(v.nonEmpty, 'Required', 'custom')
v.setSpecificMessage(v.minLength, ({ requirement }) => `Minimum length is ${requirement}`, 'custom')
v.setSpecificMessage(v.isoTimestamp, 'Required', 'custom')

v.setGlobalConfig({ lang: 'custom' })
