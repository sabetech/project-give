import { useQuery } from '@tanstack/react-query'
import { List, Tag, Empty } from 'antd-mobile'
import Navbar from '../components/Navbar'
import { getGivings } from '../services/givingService'
import type { TGiving, GivingType } from '../types/giving'

const typeColors: Record<GivingType, { bg: string; text: string }> = {
  offering: { bg: '#fea5be', text: '#7a374d' },
  tithe: { bg: '#da7286', text: '#ffffff' },
  pledge: { bg: '#570a22', text: '#ffffff' },
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatAmount = (amount: number) => {
  return `$${amount.toFixed(2)}`
}

const History = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['givings'],
    queryFn: () => getGivings(1, 100),
  })

  const givings = (data?.items || []) as unknown as TGiving[]

  return (
    <div className="pb-24">
      <Navbar title="History" />
      <div className="px-4 mt-20">
        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-on-surface-variant">Loading...</p>
          </div>
        ) : givings.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Empty description="No givings yet" />
          </div>
        ) : (
          <div className="bg-surface-container-low rounded-xl overflow-hidden">
            <List>
              {givings.map((giving: TGiving) => (
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
        )}
      </div>
    </div>
  )
}

export default History
