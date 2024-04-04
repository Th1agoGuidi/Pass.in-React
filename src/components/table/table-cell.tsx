import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge'
interface TableCellProps extends ComponentProps<'td'> {}

export function TableCell(props: TableCellProps) {
    return (
        //twMege une outras declarações junto com a já pré definida aqui
        //ou seja, se tem className="text-right" irá unir com a className declarada em twMerge
        <td {...props} className={twMerge("py-3 px-4 text-sm text-zinc-300", props.className)} />
    )
}