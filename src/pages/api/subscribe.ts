import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { stripe } from '../../services/stripe'
import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'


type User = {
    ref: {
        id: string;
    }
    data: {
        stripe_customer_id: string;
    }
}

export default async function SubscriptRequestSession(req: NextApiRequest, res: NextApiResponse) {


    //Login fazendo a subscrição dentro do stripe
    if (req.method === 'POST') {
        //Pegando a info da pessoa logada nos cookies, que é única forma de poder pegar a informação no back-end
        const session = await getSession({ req })

        //Parar não duplicar, será necessário fazer uma query no fauna para ver o user se já existe
        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        //Pega o id do stripe, se existe ou vazio
        let customerId = user.data.stripe_customer_id


        //Verificando se existe, se não, ele cria
        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email
            })


            //Necessário fazer a tipagem pra o type User, por causa do ref, ainda salvando o id do
            //Custumer logado, salvando o seu id
            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                )
            )

            customerId = stripeCustomer.id

        }



        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
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