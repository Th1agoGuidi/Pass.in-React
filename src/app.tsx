// //No TypeScript temos que declarar o formato do parametro que a função recebe
// //Quais são as _props_ que meu button pode receber
// interface MeuBotaoProps {
//     //Vai receber um texto que é uma string
//     texto: string
// }
//
// //Funções tem que ter começar letra maiuscula
// function MeuBotao(props: MeuBotaoProps) {
//     //No react nao usa class, usa className
//     //usamos {} pra mostrar um codigo js dentro do html
//     return <button className="bg-red-950 h-10 px-3 rounded font-medium">{props.texto}</button>
// }
//
// //export a função app em especificp
// export function App() {
//     return (
//         <div className="flex gap-2">
//             <button>Teste</button>
//             <MeuBotao texto="Clique Aqui"/>
//             <MeuBotao texto="Oi"/>
//             <MeuBotao texto="Hello"/>
//             <MeuBotao texto="World"/>
//             <p>Oi!</p>
//         </div>
//     )
// }

//Anotações acima, codigo começa abaixo.

import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";

export function App() {
    return(
        <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
            <Header />
            <AttendeeList />
        </div>
    )
}
