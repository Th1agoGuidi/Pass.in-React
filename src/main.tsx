import React from 'react'
import ReactDOM from 'react-dom/client'
//Como estamos exportando a função App em especifico, temos que importar em especifico tambem
//É bom sempre manter o nome dos arquivos em minusculo (App.tsx >>> app.tsx)
import { App } from './app.tsx'
import './index.css'

//Componentes e propriedades

//Componentes sao formas de separar a aplicação em vários blocos
//Geralmente separamos componentes quando temos padroes de repetições
//E quando 2 componentes podem existir sem um precisar do outro
//Componentes são funções que retornam HTML

//Propriedades serve pra enviar atributos para componentes criados

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
