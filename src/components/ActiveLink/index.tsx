import  Link,  { LinkProps} from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from 'react'

interface ActiveLinksProps extends LinkProps {
    children: ReactElement;
    activeClass: string;
}



export function ActiveLinks( { children, activeClass, ...rest}: ActiveLinksProps){
    const { asPath } = useRouter()

    const className = asPath === rest.href ? activeClass: ''   

    //Foi necessário usar o clone element. ele clona algúm elemento, nesse caso foi o <a> para passar o style
    return(
        <Link {...rest}>
            {cloneElement(children, {
                className
            })}
        </Link>
    );
}