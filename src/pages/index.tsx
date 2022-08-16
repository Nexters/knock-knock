import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Profile } from '@prisma/client'

import GatheringCard from 'src/components/GatheringCard'
import SEO from 'src/components/pageLayouts/SEO'
import { useRouter } from 'next/router'
import { trpc } from 'src/utils/trpc'
import { useUser } from 'src/shared/hooks'
import MyGroupCard from 'src/components/MyGroupCard'
import BottomSheet from 'src/components/BottomSheet'
import { IGroup } from 'src/types/Group'

import GuideModal from '../components/GuideModal'

interface IUser extends Profile {
  groups: IGroup[]
}

export default function Home() {
  const { user, isAuthenticated } = useUser()
  const router = useRouter()
  const { data: events, isLoading, error } = trpc.useQuery(['events.events'])

  const [visibleBottomSheet, setVisibleBottomSheet] = useState<'create' | null>(null)

  const [showGuideModal, setShowGuideModal] = useState(false)

  const closeGuideModal = () => {
    setShowGuideModal(false)
    localStorage.setItem('hadSeenGuideModal', 'true')
  }

  useEffect(() => {
    const hadSeenGuideModal = Boolean(localStorage.getItem('hadSeenGuideModal')) || false
    setShowGuideModal(!hadSeenGuideModal)
  }, [])

  return (
    <SEO>
      <div className="w-full h-full flex flex-col relative bg-bgColor">
        <div className="w-[100%] md:max-w-sm fixed flex justify-between items-center px-5 pt-5 z-10">
          <object data="assets/svg/logo_white.svg" />
          <div className="flex items-center">
            <Link href="/search">
              <span className="mr-3 cursor-pointer">
                <img src="assets/svg/search.svg" alt="icon" />
              </span>
            </Link>
            {isAuthenticated ? (
              <Link href="/profile">
                <div className="cursor-pointer w-[24px] h-[24px] rounded-[24px] overflow-hidden object-cover">
                  <img className="" src={`${user?.image}` ?? 'assets/images/avatar.png'} />
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

        <div className="w-full h-[205px] flex justify-center items-center bg-to">배너</div>

        <div className="mt-8">
          <h2 className="text-lg font-bold pl-5">내 약속</h2>
          <div className="mt-2 pb-2 flex flex-row overflow-x-scroll px-5">
            {(events ?? []).map((event, index) => {
              return <GatheringCard key={index} data={event} />
            })}
          </div>
        </div>

        <div className="mt-8 px-5">
          <h2 className="text-lg font-bold">내 그룹</h2>
          <div className="mt-2 pb-2 flex flex-row">
            {(user as IUser)?.groups ? (
              (user as IUser).groups.map((group, index) => {
                return <MyGroupCard key={index} data={group} />
              })
            ) : (
              <div className="w-full bg-cardBg p-3 rounded-lg mt-2">
                <span className="font-bold">아직 참여한 그룹이 없어요!</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:max-w-sm fixed bottom-10 auto flex justify-end">
          <button className="btn btn-circle bg-primary text-white mr-5" onClick={() => setVisibleBottomSheet('create')}>
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

        {visibleBottomSheet === 'create' && (
          <BottomSheet onClose={() => setVisibleBottomSheet(null)} isBackground={false}>
            <button onClick={() => router.push('/meets/create')} className="btn w-full max-w-xs bg-primary text-white">
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
        {showGuideModal && <GuideModal onClose={closeGuideModal} />}
      </div>
    </SEO>
  )
}
