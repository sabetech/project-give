import { List, Tag } from 'antd-mobile'
import { useQuery } from '@tanstack/react-query'
import type { TGiving, GivingType } from '../types/giving'
import { getRecentGivings } from '../services/givingService'

const typeColors: Record<GivingType, { bg: string; text: string }> = {
  offering: { bg: '#fea5be', text: '#7a374d' },
  tithe: { bg: '#da7286', text: '#ffffff' },
  pledge: { bg: '#570a22', text: '#ffffff' },
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatAmount = (amount: number | string) => {
  const num = typeof amount === 'number' ? amount : parseFloat(String(amount || '0'))
  return `GHc ${num.toFixed(2)}`
}

const RecentGivings = () => {
  const { data: givings, isLoading } = useQuery({
    queryKey: ['recentGivings'],
    queryFn: () => getRecentGivings(5),
  })

  if (isLoading) {
    return (
      <div className="mx-4">
        <h3 className="font-display text-base font-bold text-on-surface mb-3">
          Recent Givings
        </h3>
        <div className="bg-surface-container-low rounded-xl p-4 text-center">
          <p className="text-on-surface-variant text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-4">
      <h3 className="font-display text-base font-bold text-on-surface mb-3">
        Recent Givings
      </h3>
      <div className="bg-surface-container-low rounded-xl overflow-hidden">
        <List>
          {(givings || []).map((giving: TGiving) => (
            <List.Item
              key={giving.id}
              description={formatDate(giving.date)}
              extra={
                <div className="flex items-center gap-2">
                  <Tag
                    color="primary"
                    style={{
                      '--background-color': typeColors[giving.type].bg,
                      '--text-color': typeColors[giving.type].text,
                      fontSize: '11px',
                    }}
                  >
                    {giving.type.charAt(0).toUpperCase() + giving.type.slice(1)}
                  </Tag>
                  <span className="font-bold text-on-surface">
                    {formatAmount(giving.amount)}
                  </span>
                </div>
              }
            >
              {giving.description}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  )
}

export default RecentGivings
