import { useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { trpc } from 'src/utils/trpc'
import CenteringLayout from 'src/components/pageLayouts/CenteringLayout'
import { toast } from 'react-toastify'
import { ICreateGroup } from 'src/schema/groupSchema'
import GroupForm from 'src/components/GroupForm'
import { useCustomRouter } from 'src/shared/hooks'
import TitleHeader from 'src/components/TitleHeader'
import { useState } from 'react'

function CreateGroup() {
  const router = useCustomRouter()
  const { handleSubmit, register } = useForm<ICreateGroup>()
  const { data: session } = useSession()
  const [tags, setTags] = useState<{ text: string }[]>([])

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

    const currentTags = tags.map(tag => tag.text)
    const { name, description, password, isPublic } = formValues
    const payload: ICreateGroup = {
      name,
      description,
      tags: currentTags.join(','),
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
      <TitleHeader title="그룹 만들기" />
      <GroupForm handleSubmit={() => handleSubmit(onValid)} register={register} tags={tags} onTagsChange={setTags} />
    </CenteringLayout>
  )
}

export default CreateGroup
