import { useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import ProfileCard from '../components/ProfileCard'
import GiveOptionsSheet from '../components/GiveOptionsSheet'
import RecentGivings from '../components/RecentGivings'
import type { GivingType } from '../types/giving'

const Home = () => {
  const [showGiveSheet, setShowGiveSheet] = useState(false)
  const navigate = useNavigate()

  const handleGiveSelect = (type: GivingType) => {
    navigate(`/payment?type=${type}`)
  }

  return (
    <div className="pb-24">
      <Navbar title="Home" />
      <ProfileCard />

      <div className="mt-6 px-4">
        <button
          onClick={() => setShowGiveSheet(true)}
          className="w-full py-4 bg-primary-dark text-on-primary font-display font-bold text-lg rounded-xl border-none cursor-pointer hover:opacity-90 transition-opacity"
        >
          Give
        </button>
      </div>

      <div className="mt-6">
        <RecentGivings />
      </div>

      <GiveOptionsSheet
        visible={showGiveSheet}
        onClose={() => setShowGiveSheet(false)}
        onSelect={handleGiveSelect}
      />
    </div>
  )
}

export default Home
