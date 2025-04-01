
import * as React from "react"
import { cn } from "@/lib/utils"

const BookingTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-center align-middle text-xs font-medium bg-blue-600 text-white border-r border-white/20 last:border-r-0",
      className
    )}
    {...props}
  />
))
BookingTableHead.displayName = "BookingTableHead"

const BookingTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-2 align-middle text-sm border-r border-gray-200 last:border-r-0", className)}
    {...props}
  />
))
BookingTableCell.displayName = "BookingTableCell"

export {
  BookingTableHead,
  BookingTableCell
}
