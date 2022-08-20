import { UseFormRegister, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'
import Input from 'src/components/formElements/Input'
import Button from 'src/components/formElements/Button'
import TagInput from 'src/components/formElements/TagInput'
import Checkbox from 'src/components/formElements/Checkbox'
import { FormEvent } from 'react'

interface GroupTags {
  tags?: { text: string }[]
}

type Props = {
  handleSubmit: (e: FormEvent) => void
  register: UseFormRegister<{
    password?: number | undefined
    tags?: string | undefined
    isPublic?: boolean | undefined
    name: string
    description: string
  }>
  tags: { text: string }[]
  onTagsChange: (tags: { text: string }[]) => void
}

export default function GroupForm({ handleSubmit, register, tags, onTagsChange }: Props) {
  return (
    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-between px-5 py-14">
      <div className="mt-7">
        <Input
          name="name"
          label="그룹 이름"
          type="text"
          placeholder="그룹 이름을 입력해주세요"
          register={register('name', { required: true })}
          required
          classNames="mb-4"
        />
        <Input
          name="password"
          label="비밀번호"
          type="number"
          placeholder="6자 이내의 숫자를 입력해주세요"
          register={register('password', {
            maxLength: {
              value: 6,
              message: '6자 이내로 입력해주세요',
            },
          })}
          classNames="mb-4"
        />
        <Input
          name="description"
          label="그룹 소개"
          type="textarea"
          placeholder="20자 이내로 작성해주세요"
          register={register('description')}
          classNames="mb-4"
        />
        <TagInput
          label="태그"
          placeholder="태그를 입력해주세요"
          tags={tags}
          onChange={onTagsChange}
          classNames="mb-4"
        />
      </div>
      <div>
        <Checkbox name="public" label="이 그룹을 검색 결과에 공개할래요" register={register('isPublic')} />
        <Button type="submit" classNames="btn btn-primary">
          완료
        </Button>
      </div>
    </form>
  )
}
