import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label: string
  name: string
  kind?: 'text' | 'phone' | 'price'
  type: string
  register: UseFormRegisterReturn
  required?: boolean
  errorMessage?: string
  classNames?: string
  [key: string]: any
}

export default function Input({
  label,
  name,
  kind = 'text',
  register,
  type,
  required = false,
  errorMessage,
  classNames,
  ...rest
}: InputProps) {
  return (
    <div className={classNames ?? ''}>
      <label className="block text-sm font-medium text-textGray2 text-left mb-2" htmlFor={name}>
        {label}
      </label>
      {kind === 'text' ? (
        <div className="relative flex flex-col items-start">
          <input
            id={name}
            required={required}
            {...rest}
            {...register}
            type={type}
            className="input appearance-none w-full px-3 py-2 rounded-md shadow-sm placeholder-borderGray focus:outline-none focus:ring-borderGray focus:border-borderGray"
          />
          {errorMessage && <p className=" font-medium text-xs text-red-500 mt-1">{errorMessage}</p>}
        </div>
      ) : null}
      {kind === 'price' ? (
        <div className="rounded-md relative flex  items-center shadow-sm">
          <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="input input-bordered absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}
      {kind === 'phone' ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="input input-bordered appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
    </div>
  )
}
