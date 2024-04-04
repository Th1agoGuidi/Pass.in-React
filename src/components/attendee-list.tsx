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
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {

    //cria um estado com array tendo o valor/espelho que foi digitado no input (search)
    //e uma var para armazenar oq foi digitado (setSearch)
    const [search, setSearch] = useState('')

    //Começa na pagina 0
    const[page, setPage] = useState(1)

    const totalPages = Math.ceil(attendees.length / 10)
    // Ao input ser mudado (digitar nele, etc) pegaremos o event
    // como usamos TypeScript temos q atribuir algo a ele
    //Atribuimos o ChangeEvent que tem especificado o tipo de input html element
    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        //Colocamos o valor que foi digitado no input dentro da setSearch
        setSearch(event.target.value)
    }

    function goToFirstPage() {
        setPage(1)
    }

    function goToLastPage() {
        setPage(totalPages)
    }

    function goToPreviusPage() {
        setPage(page - 1)
    }

    function goToNextPage() {
        setPage(page + 1)
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Cabeçalho */}
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputChanged} placeholder="Buscar participante..." className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" />  
                </div>

                {search}
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
                    */}
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) =>{
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
                                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
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
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>
                        {/* Irá ocupar as 3 restantes */}
                        <TableCell colSpan={3} className="text-right">
                            <div className="inline-flex items-center gap-8 ">
                                    <span>Página {page} de {totalPages}</span>

                                <div className="flex gap-1.5">
                                    {/* Caso a page seja a primeira desabilita a pagina */}
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    {/* Caso a page seja o mesmo que o numero total de paginas desabilita a pagina */}
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