import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { toast } from 'react-toastify'
import { CreateEventInput } from 'src/pages/events/create'

interface TagInputProps {
  label: string
  tags: { id?: string; text: string }[]
  onChange: (tags: { id?: string; text: string }[]) => void
  classNames?: string
  [key: string]: any
}

export default function TagInput({ label, tags, onChange, classNames, ...rest }: TagInputProps) {
  const [inputText, setInputText] = useState('')

  return (
    <div className={classNames ?? ''}>
      <label className="block text-sm font-medium text-textGray2 text-left mb-2" htmlFor="tagInput">
        {label}
      </label>
      <div className="relative flex justify-between">
        <input
          id="tagInput"
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="input w-full bg-[#2F3035] border-none"
          {...rest}
        />
        <button
          onClick={e => {
            e.preventDefault()
            if (!inputText) return
            setInputText('')
            if (tags.findIndex(tag => tag.text === inputText) === -1) {
              onChange([...tags, { text: inputText }])
            } else {
              toast.warn('이미 동일한 태그가 존재합니다.')
            }
          }}
          className="w-1/6 h-[72%] text-sm rounded-lg bg-[#5D5E62] absolute top-[14%] right-3"
        >
          추가
        </button>
      </div>
      <div className="flex flex-wrap my-3">
        {tags.map((tag, index) => (
          <div
            key={tag.text}
            className="badge bg-[#2F3035] border-none py-4 px-3 text-white gap-2"
            onClick={() => {
              const updatedTags = tags.filter((_tag, tagIndex) => index !== tagIndex)
              onChange(updatedTags)
            }}
          >
            {tag.text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
