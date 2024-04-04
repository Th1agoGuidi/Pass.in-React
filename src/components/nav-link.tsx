import { ComponentProps } from "react"

//cria uma interface NavLinkProps
//ComponentProps ira extender / incluir todas as propriedades da tag <a>
interface NavLinkProps extends ComponentProps<'a'> {
    //Dentro da interface cria um atributo children q é uma string / linha / texto
    children: string
    href: string
}

//props recebe o valor contido na interface
export function NavLink(props: NavLinkProps) {
    return (
        //puxa o parametro de props e pega a href e a children

        //...props vai pegar todas as propriedades enviadas pra dentro do navLinkProps e adicionar como atributos na tag a
        <a {...props} className="font-medium text-sm">{props.children}</a>
    )
}