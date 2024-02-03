import { FormControl } from "./FormControl"

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const CheckBox = ({ checked, onChange, label }: Props) => {
  return (
    <FormControl label={label}>
      <input type="checkbox" checked={checked} className="checkbox checkbox-primary" onChange={(e) => {
        onChange(e.target.checked)
      }} />
    </FormControl>
  )
}