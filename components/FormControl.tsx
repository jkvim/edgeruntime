import { ReactNode } from "react"
import cn from 'classnames';

type Props = {
  children: ReactNode
  label: string
  className?: string
}

export const FormControl = ({ children, label, className }: Props) => {
  return (
    <div className={cn("form-control items-start w-auto max-w-xs", className)}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  )
}