
import * as React from "react"
import { cn } from "@/lib/utils"

const InvoiceTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-center align-middle text-xs font-medium bg-soqotra-blue text-white border-r border-white/20 last:border-r-0",
      className
    )}
    {...props}
  />
))
InvoiceTableHead.displayName = "InvoiceTableHead"

const InvoiceTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-2 align-middle text-xs border-r border-gray-200 last:border-r-0", className)}
    {...props}
  />
))
InvoiceTableCell.displayName = "InvoiceTableCell"

export {
  InvoiceTableHead,
  InvoiceTableCell
}
