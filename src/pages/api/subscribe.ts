import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { stripe } from '../../services/stripe'

export default async function SubscriptRequestSession(req: NextApiRequest, res: NextApiResponse) {


    //Login fazendo a subscrição dentro do stripe
    if (req.method === 'POST') {
        //Pegando a info da pessoa logada nos cookies, que é única forma de poder pegar a informação no back-end
        const session = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email
        })

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [{
                price: 'price_1KKW6zAV19k8lLPsjd5pHrlY', quantity: 1
            }],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}