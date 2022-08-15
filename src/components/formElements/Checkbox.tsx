import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  name: string
  label: string
  register: UseFormRegisterReturn
  classNames?: string
}

export default function Checkbox({ name, label, register, classNames }: Props) {
  return (
    <div className={classNames ?? ''}>
      <label htmlFor={name} className="w-full flex justify-between items-center text-sm font-medium text-textGray">
        {label}
        <input type="checkbox" id={name} {...register} className="checkbox checkbox-lg checkbox-primary w-4 h-4 ml-2" />
      </label>
    </div>
  )
}
