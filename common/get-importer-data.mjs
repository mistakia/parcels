import db from '#db'

export default async function (name) {
  const results = await db('importers').where({ name })
  return results[0]
}
