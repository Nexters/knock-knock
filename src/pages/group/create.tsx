import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { trpc } from 'src/utils/trpc'
import CenteringLayout from 'src/components/pageLayouts/CenteringLayout'
import Input from 'src/components/formElements/Input'
import Button from 'src/components/formElements/Button'
import TagInput from 'src/components/formElements/TagInput'
import Checkbox from 'src/components/formElements/Checkbox'
import { toast } from 'react-toastify'
import { ICreateGroup } from 'src/schema/groupSchema'

interface GroupTags {
  tags?: { text: string }[]
}

function CreateGroup() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<ICreateGroup>()
  const { data: session } = useSession()
  const {
    control,
    formState: { errors },
  } = useForm<GroupTags>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const { mutate } = trpc.useMutation('groups.create-group', {
    onSuccess: async data => {
      await toast('생성 완료!', { autoClose: 2000 })
      await insertMutation({ groupId: data.id })
      router.push(`/group/${data.id}`)
    },
    onError() {
      toast('생성 실패...', { autoClose: 2000 })
    },
  })

  const { mutate: insertMutation } = trpc.useMutation('groups.insert-host-group')

  const onValid: SubmitHandler<ICreateGroup> = async (formValues: ICreateGroup) => {
    if (!session?.user) return
    if (!formValues.name) return
    if (!formValues.description) return

    const tags = fields.map(field => field.text)
    const { name, description, password, isPublic } = formValues
    const payload: ICreateGroup = {
      name,
      description,
      tags: tags.join(','),
      password: Number(password),
      isPublic,
    }
    try {
      await mutate(payload)
    } catch (error) {
      alert('뭔가 잘못됐어요..')
    }
  }

  return (
    <CenteringLayout seoTitle="그룹 생성">
      <div className="fixed w-full bg-bgColor top-0 pb-4">
        <button onClick={() => router.back()} className="absolute top-9 left-5 ">
          <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer left-0" />
        </button>
        <h1 className="mt-8 text-xl font-bold text-white text-center ">그룹 만들기</h1>
      </div>
      <form onSubmit={handleSubmit(onValid)} className="w-full h-full flex flex-col justify-between px-5 py-14">
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
          <Button type="submit" classNames="btn btn-primary">
            완료
          </Button>
        </div>
      </form>
    </CenteringLayout>
  )
}

export default CreateGroup
