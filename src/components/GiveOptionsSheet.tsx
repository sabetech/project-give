import { Popup, Grid } from 'antd-mobile'
import { AiOutlineGift, AiOutlineDollar, AiOutlineFileText } from 'react-icons/ai'
import type { GivingType } from '../types/giving'

type GiveOptionsSheetProps = {
  visible: boolean
  onClose: () => void
  onSelect: (type: GivingType) => void
}

const options = [
  { type: 'offering' as GivingType, label: 'Offering', icon: AiOutlineGift },
  { type: 'tithe' as GivingType, label: 'Tithe', icon: AiOutlineDollar },
  { type: 'pledge' as GivingType, label: 'Make Pledge', icon: AiOutlineFileText },
]

const GiveOptionsSheet = ({ visible, onClose, onSelect }: GiveOptionsSheetProps) => {
  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      bodyStyle={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
    >
      <div className="p-5 pb-8">
        <h2 className="font-display text-lg font-bold text-on-surface mb-5 text-center">
          Choose Giving Type
        </h2>
        <Grid columns={3} gap={16}>
          {options.map((option) => (
            <Grid.Item key={option.type}>
              <button
                onClick={() => {
                  onSelect(option.type)
                  onClose()
                }}
                className="flex flex-col items-center justify-center w-full p-4 bg-surface-container rounded-xl border-none cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <option.icon size={32} color="#570a22" />
                <span className="text-on-surface text-sm mt-2 font-medium">
                  {option.label}
                </span>
              </button>
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </Popup>
  )
}

export default GiveOptionsSheet
