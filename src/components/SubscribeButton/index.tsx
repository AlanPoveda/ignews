import { useSession, signIn } from 'next-auth/react'
import { stripe } from '../../services/stripe'
import { api } from '../../services/api'
import styles from './styles.module.scss'
import { getStripeJs } from '../../services/stripe-js'

interface SubscribeButtonProps {
    priceId: string
}


export function SubscribeButton({ priceId }: SubscribeButtonProps){
    const { data: session } = useSession()


    async function handleSubscribe(){
        if(!session){
            signIn('github');
            return
        }

        try{
            //Nome do documento para a rota
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            stripe.redirectToCheckout({ sessionId })
        }catch(err){
            alert(err.message)
        }


    }

    return(
        <>
        <button
        type='button'
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
            Subscribe Now

        </button>
        </>
    );
}