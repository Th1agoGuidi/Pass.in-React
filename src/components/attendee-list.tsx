//Importar o icone
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import dayjs  from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useEffect, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

//temos que declarar oq é o Attendee
interface Attendee {
    id: string
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}


export function AttendeeList() {

    //cria um estado com array tendo o valor/espelho que foi digitado no input (search)
    //e uma var para armazenar oq foi digitado (setSearch)
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())

        //Se dentro da URL eu tiver o parametro search
        if (url.searchParams.has('search')) {
            //Eu vou retornar esse parametro como sendo o valor inical da pagina, se nao nulo
            return url.searchParams.get('search') ?? ''
        }

        //senao retorno string vazia
        return ''
    })


    //Começa na pagina 0
    const[page, setPage] = useState(() => {
        const url = new URL(window.location.toString())

        //Se dentro da URL eu tiver o parametro page
        if (url.searchParams.has('page')) {
            //Eu vou retornar esse parametro como sendo o valor inical da pagina
            return Number(url.searchParams.get('page'))
        }

        //senao retorno 1 (pagina inicial)
        return 1
    })

    const [total, setTotal] = useState(0)

    //useEffect SÓ IRÁ DISPARAR a função quando o page mudar, ignorando mudanças em outros estados
    useEffect(() => {
        //Vamos "quebrar a url para manipular ela melhor"
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
        //Aqui apos /attendees/ setamos pageIndex e a var contendo o numero da pagina
        url.searchParams.set('pageIndex', String(page - 1))

        //Só ira mudar se o input de search for maior q 0 (alguem digitar algo)
        if (search.length > 0) {
            url.searchParams.set('query', search)
        }


        fetch(url)
            //Retorna o resultando em .json
            .then(response => response.json())
            .then(data => {
                setAttendees(data.attendees)
                setTotal(data.total)
            })
        //Ouviremos toda vez q a var page e search mudar
    }, [page, search])

    function setCurrentSearch(search: string) {
        //ira retornar todo o URL da pagina na var
        const url = new URL(window.location.toString())

        //Seta o URL da pagina
        url.searchParams.set('search', search)

        //Altera o URL sem recarregar a pagina
        window.history.pushState({}, "", url)

        setSearch(search)
    }

    function setCurrentPage(page: number) {
         //ira retornar todo o URL da pagina na var
         const url = new URL(window.location.toString())

         //Seta o URL da pagina
         url.searchParams.set('page', String(page))
 
         //Altera o URL sem recarregar a pagina
         window.history.pushState({}, "", url)

         setPage(page)
    }

    //Array com a lista de participantes que iremos puxar da API
    //useState irá receber o Attendee com todas suas propriedades que declaramos acima
    const [attendees, setAttendees] = useState<Attendee[]>([])

    const totalPages = Math.ceil(total / 10)
    // Ao input ser mudado (digitar nele, etc) pegaremos o event
    // como usamos TypeScript temos q atribuir algo a ele
    //Atribuimos o ChangeEvent que tem especificado o tipo de input html element
    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        //Colocamos o valor que foi digitado no input dentro da setSearch
        setCurrentSearch(event.target.value)
        // E volta pra pagina 1
        setCurrentPage(1)
        // setPage(1)
    }
    
    function goToFirstPage() {
        // setPage(1)
        setCurrentPage(1) 
    }

    function goToLastPage() {
        // setPage(totalPages)
        setCurrentPage(totalPages)
    }

    function goToPreviusPage() {
        // setPage(page - 1)
        setCurrentPage(page - 1)
    }

    function goToNextPage() {
        // setPage(page + 1)
        setCurrentPage(page + 1)

    }

    return (
        <div className="flex flex-col gap-4">
            {/* Cabeçalho */}
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputChanged} value={search} placeholder="Buscar participante..." className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0" />  
                </div>
            </div>

            <Table>
                {/* Guia da Lista */}
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{width: 48}}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Partipante</TableHeader>
                        <TableHeader>Data da Inscrição</TableHeader>
                        <TableHeader>Data do Check-In</TableHeader>
                        {/* passamos uma var js{} no style e dps um objeto{}, por isso o {{}} */}
                        <TableHeader style={{width: 64}}></TableHeader>
                    </tr>
                </thead>

                {/* Lista de Participantes */}
                <tbody>
                    {/* Mostra o array contendo os participantes
                        slice começa da page 0 ate a 10 (-1 * 10)
                        na page 2 vai da 10 ate 20 ( page=2 * 10 = 20)

                        Porém não sera mais necessario pois a API retorna apenas 10 itens
                    */}
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id} >
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                {/* Se a data de checkin for nula, aparece Não fez checkin, senão aparece a data que fez o checkin */}
                                <TableCell>
                                    {attendee.checkedInAt === null 
                                    ? <span className='text-zinc-500'>Não fez Check-in</span>
                                    : dayjs().to(attendee.checkedInAt)}
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </tbody>

                {/* Footer */}
                <tfoot>
                    <tr>
                        {/* Irá ocupar as 3 primeiras colunas */}
                        <TableCell colSpan={3}>
                            Mostrando {attendees.length} de {total} itens
                        </TableCell>
                        {/* Irá ocupar as 3 restantes */}
                        <TableCell colSpan={3} className="text-right">
                            <div className="inline-flex items-center gap-8 ">
                                    <span>Página {page} de {totalPages}</span>

                                <div className="flex gap-1.5">
                                    {/* Caso a page seja a primeira desabilita a o botao */}
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    {/* Caso a page seja o mesmo que o numero total de paginas desabilita o botao */}
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>    
        </div>

    )
}