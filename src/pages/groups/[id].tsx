import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { trpc } from 'src/utils/trpc'
import { useUser } from 'src/shared/hooks'
import SEO from 'src/components/pageLayouts/SEO'
import BottomSheet from 'src/components/BottomSheet'
import GatheringCard from 'src/components/GatheringCard'
import { toast } from 'react-toastify'

export default function GroupDetail() {
  const [visibleBottomSheet, setVisibleBottomSheet] = useState<'create' | null>(null)
  const [visibleMoreButtonModal, setVisibleMoreButtonModal] = useState<any | null>(null)

  const { user, isAuthenticated } = useUser()
  const router = useRouter()
  const {
    data: groupData,
    isLoading,
    error,
  } = trpc.useQuery(['groups.single-group', { groupId: router.query.id as string }])

  console.log(groupData)
  const utils = trpc.useContext()

  const deleteEventMutation = trpc.useMutation('events.delete-event', {
    onSuccess() {
      utils.invalidateQueries(['groups.single-group'])
      toast('약속을 삭제했습니다.', { autoClose: 2000 })
    },
    onError() {
      toast('다시 시도해주세요.', { autoClose: 2000 })
    },
  })

  const leaveEventMutation = trpc.useMutation('events.my-cells', {
    onSuccess() {
      toast('약속을 떠났습니다.', { autoClose: 2000 })
    },
    onError() {
      toast('다시 시도해주세요.', { autoClose: 2000 })
    },
  })

  const onDeleteEvent = (eventId: string) => {
    deleteEventMutation.mutate({ eventId: eventId })
    setVisibleMoreButtonModal(null)
  }

  const onLeaveEvent = (eventId: string) => {
    if (!user?.id) return
    leaveEventMutation.mutate({ eventId: eventId, profileId: user.id, cells: '' })
    setVisibleMoreButtonModal(null)
  }

  return (
    <SEO>
      <div className="w-full h-full flex flex-col relative bg-bgColor">
        <div className="w-[100%] md:max-w-sm fixed flex justify-between items-center px-5 pt-5 z-10">
          <Link href="/">
            <img src="/assets/svg/logo_white.svg" />
          </Link>
          <div className="flex items-center">
            <Link href="/search">
              <span className="mr-3 cursor-pointer">
                <img src="/assets/svg/search.svg" alt="icon" />
              </span>
            </Link>
            {isAuthenticated ? (
              <Link href="/profile">
                <div className="cursor-pointer w-[24px] h-[24px] rounded-[24px] overflow-hidden object-cover">
                  <img className="" src={`${user?.image}` ?? '/assets/images/avatar.png'} />
                </div>
              </Link>
            ) : (
              <Link href="/auth/login">
                <div className="cursor-pointer px-4 py-1 bg-gradient-to-r from-from to-to rounded-[54px]">
                  <span className="text-sm text-white">로그인</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="w-full h-[205px] flex justify-end items-start flex-col bg-to p-4">
          <div className="badge badge-secondary mb-2 text-2xs mr-2">{groupData?.isPublic ? '공개' : '비공개'}</div>
          <div className="flex justify-between w-full">
            <span className="font-bold text-lg">{groupData?.name}</span>
            {groupData?.profileId === user?.id && (
              <div
                className="flex items-center"
                onClick={() => router.push({ pathname: '/group/modify', query: { id: `${router.query.id}` } })}
              >
                <img className="w-[20px]" src={'/assets/svg/Edit_outlined.svg'} />
                <span className="text-sm"> 그룹 수정</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold pl-5">약속 모임</h2>
          <div className="mt-2 pb-2 flex flex-row overflow-x-auto px-5">
            <div className="w-full">
              {(groupData?.events ?? []).map((event, index) => {
                return (
                  <GatheringCard
                    onMoreButtonClick={() => setVisibleMoreButtonModal(event)}
                    key={index}
                    event={event}
                    group={groupData}
                    isWideView
                  />
                )
              })}
            </div>
          </div>

          <div className="mt-8 px-5"></div>
          <div className="w-full md:max-w-sm fixed bottom-10 auto flex justify-end">
            <button
              className="btn btn-circle bg-primary text-white mr-5"
              onClick={() => setVisibleBottomSheet('create')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        {visibleBottomSheet === 'create' && (
          <BottomSheet onClose={() => setVisibleBottomSheet(null)} isBackground={false}>
            <button onClick={() => router.push('/events/create')} className="btn w-full max-w-xs bg-primary text-white">
              약속 만들기
            </button>
            <button
              onClick={() => router.push('/group/create')}
              className="btn w-full max-w-xs bg-white text-bgColor mt-2"
            >
              그룹 만들기
            </button>
          </BottomSheet>
        )}
        {visibleMoreButtonModal && (
          <BottomSheet onClose={() => setVisibleMoreButtonModal(null)} isBackground={false}>
            {user?.events.some(value => value.profileId === visibleMoreButtonModal.profileId) && (
              <>
                <Link href={`/events/edit/${visibleMoreButtonModal}`}>
                  <a className="btn w-full md:max-w-sm bg-primary">
                    <span className="text-white">약속 수정하기</span>
                  </a>
                </Link>
                <button
                  onClick={() => onDeleteEvent(visibleMoreButtonModal.id)}
                  className="btn w-full md:max-w-sm bg-white mt-2"
                >
                  <span className="text-bgColor">약속 삭제하기</span>
                </button>
              </>
            )}
            <button
              onClick={() => onLeaveEvent(visibleMoreButtonModal.id)}
              className="btn w-full md:max-w-sm bg-buttonGray mt-2"
            >
              <span className="text-white">떠나기</span>
            </button>
          </BottomSheet>
        )}
      </div>
    </SEO>
  )
}
