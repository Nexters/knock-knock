import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { trpc } from 'src/utils/trpc'
import CenteringLayout from 'src/components/pageLayouts/CenteringLayout'
import { toast } from 'react-toastify'
import { ICreateGroup, IModifyGroup } from 'src/schema/groupSchema'
import GroupForm from 'src/components/GroupForm'
import { useCustomRouter } from 'src/shared/hooks'
import TitleHeader from 'src/components/TitleHeader'

function ModifyGroup() {
  const router = useCustomRouter()
  const { handleSubmit, register, reset } = useForm<ICreateGroup>()
  const { data: session } = useSession()
  const [tags, setTags] = useState<{ text: string }[]>([])
  const {
    data: groupData,
    isLoading,
    error,
  } = trpc.useQuery(['groups.single-group', { groupId: router.query.id as string }], {
    staleTime: Infinity,
  })

  const { mutate } = trpc.useMutation('groups.modify-group', {
    onSuccess: async data => {
      await toast('수정 완료!', { autoClose: 2000 })
    },
    onError() {
      toast('수정 실패...', { autoClose: 2000 })
    },
  })

  const onValid: SubmitHandler<ICreateGroup> = async (formValues: ICreateGroup) => {
    if (!session?.user) return
    if (!formValues.name) return
    if (!formValues.description) return

    const currentTags = tags.map(field => field.text)
    const { name, description, password, isPublic } = formValues
    const payload: IModifyGroup = {
      id: router.query.id as string,
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

  useEffect(() => {
    if (groupData) {
      reset(groupData as IModifyGroup)
      const tags = groupData?.tags?.split(',')
      if (tags?.length) setTags(tags.map(tag => ({ text: tag })))
    }
  }, [groupData])

  return (
    <CenteringLayout seoTitle="그룹 수정">
      <TitleHeader title="그룹 수정" />
      <GroupForm handleSubmit={handleSubmit(onValid)} register={register} tags={tags} onTagsChange={setTags} />
    </CenteringLayout>
  )
}

export default ModifyGroup
