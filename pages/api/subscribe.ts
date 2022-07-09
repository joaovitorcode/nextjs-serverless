import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb: Db

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri)

  const dbName = url.parse(uri).pathname?.substring(1)

  const db = client.db(dbName)

  cachedDb = db

  return db
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body

  const db = await connectToDatabase(process.env.MONGODB_URI!)

  const collection = db.collection('subscribers')

  await collection.insertOne({
    email,
    subscribeAt: new Date(),
  })

  return res.status(201).json({ ok: true })
}
