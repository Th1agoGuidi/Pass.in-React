import nlwIcon from '../assets/nlw-inco.svg'
import { NavLink } from './nav-link'

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">
            {/* Import do icon */}
            <img src={nlwIcon} alt="Icone NLW" />

            <nav className="flex items-center gap-5"> 
                {/* <a href="" className="font-medium text-sm text-zinc-300">Eventos</a> */}
                <NavLink href="./eventos">Eventos</NavLink>
                <NavLink href="./participantes">Participantes</NavLink>
            </nav>
        </div>
    )
}