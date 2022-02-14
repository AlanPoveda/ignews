import { NextApiResponse, NextApiRequest } from "next"
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'

//Stream
import { Readable } from 'stream'
import { saveSubscription } from "./_lib/manageSubscription";

//Funcao para ler as streams

async function buffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks)
}

//Desabilitar o entendimento padrão do react, pois não é um Json que esta recebendo, mas sim uma stream

export const config = {
    api: {
        bodyParser: false
    }
}

//Pegando os valores relevantes
const relevantEvents = new Set([
    "checkout.session.completed",
    'customer.subscription.updated',
    'customer.subscription.deleted'
])

export default async function webHookResponse(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const buff = await buffer(req);
        //Pegando a chave do header, que também é a mesma da env
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event;

        console.log(event)

        try {
            event = stripe.webhooks.constructEvent(buff, secret, process.env.STRIPE_WEBHOOK_SECRET_KEY)

        } catch (err) {
            return res.status(400).send(`Webhook error ${err}`)
        }

        const { type } = event;


        if (relevantEvents.has(type)) {

            try {
                switch (type) {

                    case 'customer.subscription.updated':
                    case 'customer.subscription.deleted':
                        const subscription = event.data.object as Stripe.Subscription;

                        await saveSubscription(
                            subscription.id,
                            subscription.customer.toString(),
                            false
                        )

                        break
                    case 'checkout.session.completed':
                        //Pegando o subscription, e ver todos os métodos
                        const checkoutSession = event.data.object as Stripe.Checkout.Session;

                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString(),
                            true
                        )

                        break;
                    default:
                        throw new Error('Unhandled error')
                }
            } catch (err) {
                return res.json({ error: 'Webhook handler error' })

            }
        }

        res.json({ 'message': 'OK' })
    } else {
        res.setHeader("Allow", "POST")
        res.status(405).end("Method not allowed")
    }
}