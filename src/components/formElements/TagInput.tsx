import { useState } from 'react'

interface TagInputProps {
  label: string
  tags: { id: string; text: string }[]
  onAddTag: (tag: string) => void
  onRemoveTag: (index: number) => void
  classNames?: string
  [key: string]: any
}

export default function TagInput({ label, tags, onAddTag, onRemoveTag, classNames, ...rest }: TagInputProps) {
  const [inputText, setInputText] = useState('')

  return (
    <div className={classNames ?? ''}>
      <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="tagInput">
        {label}
      </label>
      <div className="relative flex justify-between">
        <input
          id="tagInput"
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="appearance-none w-4/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          {...rest}
        />
        <button
          onClick={() => {
            setInputText('')
            onAddTag(inputText)
          }}
          className="w-1/6 border rounded-md border-gray-300"
        >
          추가
        </button>
      </div>
      <div className="flex flex-wrap my-3">
        {tags.map((tag, index) => (
          <button key={tag.id} onClick={() => onRemoveTag(index)} className="bg-gray-200 px-2 mr-2 mb-2 rounded-md">
            {tag.text}
          </button>
        ))}
      </div>
    </div>
  )
}
