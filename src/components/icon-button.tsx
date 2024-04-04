import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

//Cria / extende todas as propriedades do elemento <button> do html
interface IconButtonProps extends ComponentProps<'button'> {
    transparent?: boolean
}
// {transparent, ...props} tira a propriedade transparente de props
export function IconButton({ transparent, ...props}: IconButtonProps) {
    return (
        <button 
            {...props} 
            // className={transparent 
            //     //Se tiver transparent = true no botao
            //     ? "bg-black/20 border border-white/10 rounderd-med p-1.5" 
            //     //Se não
            //     : "bg-white/15 border border-white/15 rounded-md p-1.5"
            // }
            //Ultilizando a lib de merge
            className={twMerge(
                //por padrao tera essas classes
                'border border-white/10 rounderd-med p-1.5',
                //se o elemento for transparente sera black, senao white
                transparent ? 'bg-black/20' : 'bg-white/15',
                //Se tiver desabilitado a opacidade sera de 50, senao será padrao
                props.disabled ? 'opacity-50' : null
            )}
        />
    )
}