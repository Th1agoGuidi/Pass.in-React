import { ComponentProps } from "react"

//extende todos as propiedades de <table>
interface TableProps extends ComponentProps<'table'> {}

export function Table(props: TableProps) {
    return (
        <div className="border border-white/10 rounder-lg">
            <table className="w-full" {...props} />
        </div>
    )
}