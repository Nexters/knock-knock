import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import GatheringCard from 'src/components/GatheringCard'
import SEO from 'src/components/pageLayouts/SEO'
import { trpc } from 'src/utils/trpc'
import { useCustomRouter, useUser } from 'src/shared/hooks'
import MyGroupCard from 'src/components/MyGroupCard'
import BottomSheet from 'src/components/BottomSheet'
import GuideModal from 'src/components/modals/GuideModal'
// import SkeletonCard from 'src/components/SkeletonCard'

export default function Home() {
  const utils = trpc.useContext()
  const { user, isAuthenticated } = useUser()
  const { data: me } = trpc.useQuery(['users.me'])
  const router = useCustomRouter()

  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [visibleMoreButtonModal, setVisibleMoreButtonModal] = useState<any | null>(null)

  const deleteEventMutation = trpc.useMutation('events.delete-event', {
    onSuccess() {
      utils.invalidateQueries(['users.me'])
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

  const [showGuideModal, setShowGuideModal] = useState(false)

  const closeGuideModal = () => {
    setShowGuideModal(false)
    localStorage.setItem('hadSeenGuideModal', 'true')
    router.removeHash()
  }

  useEffect(() => {
    const hadSeenGuideModal = Boolean(localStorage.getItem('hadSeenGuideModal')) || false
    setShowGuideModal(!hadSeenGuideModal)
  }, [])

  return (
    <SEO>
      <div className="w-full h-full flex flex-col relative">
        <div className="w-full md:max-w-sm fixed flex justify-between items-center px-5 pt-5 z-10">
          <object data="/assets/svg/logo_white.svg" />
          <div className="flex items-center">
            {isAuthenticated ? (
              <Link href="/profile">
                <div className="cursor-pointer w-[24px] h-[24px] rounded-[24px] overflow-hidden object-cover mr-3">
                  <img className="" src={`${user?.image}` ?? '/assets/images/avatar.png'} />
                </div>
              </Link>
            ) : (
              <Link href="/auth/login">
                <div className="cursor-pointer px-4 py-[2px] bg-gradient-to-r from-from to-to rounded-[54px] mr-3">
                  <span className="text-sm text-white">로그인</span>
                </div>
              </Link>
            )}
            <Link href="/search">
              <span className="cursor-pointer">
                <img src="assets/svg/search.svg" alt="icon" />
              </span>
            </Link>
          </div>
        </div>

        <div className="w-full h-[205px] flex justify-start items-end p-5 bg-[url('/assets/images/banner1.png')] bg-cover bg-bottom">
          <span className="font-bold text-xl">
            쉽고 빠르게
            <br />
            약속 잡는법!
          </span>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold pl-5">내 약속</h2>
          <div className="mt-2 pb-2 flex flex-row overflow-x-auto px-5">
            {me?.events?.length ? (
              me?.events.map((event, index) => {
                return (
                  <GatheringCard key={index} event={event} onMoreButtonClick={() => setVisibleMoreButtonModal(event)} />
                )
              })
            ) : (
              <Link href="/events/create">
                <div className="card bg-cardBg rounded-xl min-w-[190px] min-h-[150px] flex justify-center mt-2 px-4 cursor-pointer">
                  <span className="text-textGray font-bold">
                    새로운 약속을
                    <br />
                    만들어보세요
                  </span>
                  <span className="mt-3 font-extrabold text-to">{'→'}</span>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 px-5">
          <div className="flex justify-between items-baseline">
            <h2 className="text-lg font-bold">내 그룹</h2>
            <Link href="/groups">
              <span className="text-sm text-textGray cursor-pointer">전체 보기</span>
            </Link>
          </div>
          <div className="mt-2 pb-2 flex flex-col">
            {(me?.groups?.length ?? 0) > 0 ? (
              me!.groups.map((group, index) => {
                return <MyGroupCard key={index} data={group as any} />
              })
            ) : (
              <div className="w-full bg-cardBg p-3 rounded-lg mt-2">
                <span className="text-textGray font-bold">
                  {isAuthenticated ? '새로운 그룹을 만들어보세요' : '로그인 후 이용가능 합니다'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:max-w-sm fixed bottom-10 flex justify-end">
          <button className="btn btn-circle bg-primary text-white mr-5" onClick={() => setVisibleCreateModal(true)}>
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

        {visibleCreateModal && (
          <BottomSheet
            onClose={e => {
              e.stopPropagation()
              setVisibleCreateModal(false)
            }}
            isBackground={false}
          >
            <Link href="/events/create">
              <a className="btn w-full md:max-w-sm bg-primary">
                <span className="text-white">약속 만들기</span>
              </a>
            </Link>
            <Link href="/groups/create">
              <a className="btn w-full md:max-w-sm bg-white mt-2">
                <span className="text-bgColor">그룹 만들기</span>
              </a>
            </Link>
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
        {showGuideModal && <GuideModal onClose={closeGuideModal} />}
      </div>
    </SEO>
  )
}
