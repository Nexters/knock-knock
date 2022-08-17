import { useSession } from 'next-auth/react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { trpc } from 'src/utils/trpc'
import CenteringLayout from 'src/components/pageLayouts/CenteringLayout'
import { toast } from 'react-toastify'
import { ICreateGroup } from 'src/schema/groupSchema'
import GroupForm from 'src/components/GroupForm'
import { useCustomRouter } from 'src/shared/hooks'

interface GroupTags {
  tags?: { text: string }[]
}

function CreateGroup() {
  const router = useCustomRouter()
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
      <div className="fixed w-full sm:max-w-sm bg-bgColor top-0 pb-4">
        <button onClick={() => router.back()} className="absolute top-9 left-5 ">
          <img src="/assets/svg/Arrow left.svg" alt="icon" className="cursor-pointer left-0" />
        </button>
        <h1 className="mt-8 text-xl font-bold text-white text-center ">그룹 만들기</h1>
      </div>
      <GroupForm
        handleSubmit={() => handleSubmit(onValid)}
        register={register}
        fields={fields}
        remove={remove}
        append={append}
      />
    </CenteringLayout>
  )
}

export default CreateGroup
