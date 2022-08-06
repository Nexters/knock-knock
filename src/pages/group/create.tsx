import { useForm, useFieldArray } from 'react-hook-form'
import CenteringLayout from '../../components/pageLayouts/CenteringLayout'
import Input from '../../components/formElements/Input'
import Button from '../../components/formElements/Button'
import TagInput from '../../components/formElements/TagInput'
import Checkbox from '../../components/formElements/Checkbox'

interface CreateGroupInput {
  name: string
  password?: number
  introduction?: string
  tags?: { text: string }[]
  isPublic: boolean
}

function CreateGroup() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupInput>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (values: CreateGroupInput) => {
    console.log(values)
  }

  return (
    <CenteringLayout seoTitle="그룹 생성">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-between px-5 py-14">
        <div>
          <Input
            name="name"
            label="그룹 이름"
            type="text"
            placeholder="그룹 이름을 입력해주세요"
            register={register('name', {
              required: true,
            })}
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
            errorMessage={errors.password?.message}
          />
          <Input
            name="introduction"
            label="그룹 소개"
            type="textarea"
            placeholder="20자 이내로 작성해주세요"
            register={register('introduction')}
            classNames="mb-4"
          />
          <TagInput
            label="태그"
            placeholder="태그를 입력해주세요"
            tags={fields}
            onAddTag={tag => {
              if (fields.findIndex(field => field.text === tag) === -1) {
                append({ text: tag })
              } else {
                console.log('이미 동일한 태그가 존재합니다.')
              }
            }}
            onRemoveTag={index => remove(index)}
            classNames="mb-4"
          />
        </div>
        <div>
          <Checkbox name="public" label="이 모임을 검색 결과에 공개할래요" register={register('isPublic')} />
          <Button type="submit">완료</Button>
        </div>
      </form>
    </CenteringLayout>
  )
}

export default CreateGroup
