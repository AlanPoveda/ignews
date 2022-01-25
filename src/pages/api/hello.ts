// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponse, NextApiRequest } from "next"


export default function handler(request: NextApiRequest, response: NextApiResponse) {
  const users = [
    {id:1, name: "Alan Poveda"},
    {id:1, name: "Alan Poveda"},
    {id:1, name: "Alan Poveda"},
  ]
  return response.json(users);
}