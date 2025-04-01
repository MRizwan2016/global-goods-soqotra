
import * as React from "react"
import { cn } from "@/lib/utils"

const ShipperTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-3 text-left align-middle text-sm font-medium bg-gray-100 text-gray-700 border-b border-gray-200",
      className
    )}
    {...props}
  />
))
ShipperTableHead.displayName = "ShipperTableHead"

const ShipperTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-3 align-middle text-sm border-b border-gray-100", className)}
    {...props}
  />
))
ShipperTableCell.displayName = "ShipperTableCell"

export {
  ShipperTableHead,
  ShipperTableCell
}
