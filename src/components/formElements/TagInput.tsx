import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CreateEventInput } from 'src/pages/events/create'

interface TagInputProps {
  label: string
  tags: { id?: string; text: string }[]
  onAddTag: (tag: string) => void
  onRemoveTag: (index: number) => void
  classNames?: string
  [key: string]: any
}

export default function TagInput({ label, tags, onAddTag, onRemoveTag, classNames, ...rest }: TagInputProps) {
  const [inputText, setInputText] = useState('')

  return (
    <div className={classNames ?? ''}>
      <label className="mb-1 block text-sm font-medium text-[#F3F4F4] text-left" htmlFor="tagInput">
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
            setInputText('')
            onAddTag(inputText)
          }}
          className="w-1/5 text-sm rounded-md bg-[#5D5E62]"
        >
          추가
        </button>
      </div>
      <div className="flex flex-wrap my-3">
        {tags.map((tag, index) => (
          <div
            key={tag.id}
            className="badge bg-[#2F3035] border-none py-4 px-3 text-white gap-2"
            onClick={() => onRemoveTag(index)}
          >
            {tag.text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
