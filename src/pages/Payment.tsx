import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button, Input, Toast } from 'antd-mobile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Navbar from '../components/Navbar'
import { createGiving } from '../services/givingService'
import type { GivingType } from '../types/giving'

const Payment = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const givingType = (searchParams.get('type') || 'offering') as GivingType
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const mutation = useMutation({
    mutationFn: createGiving,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentGivings'] })
      queryClient.invalidateQueries({ queryKey: ['givings'] })
      Toast.show({ content: 'Giving recorded successfully!', icon: 'success' })
      navigate('/')
    },
    onError: (error) => {
      Toast.show({ content: 'Failed to record giving', icon: 'fail' })
      console.error('Giving failed:', error)
    },
  })

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Toast.show({ content: 'Please enter a valid amount', icon: 'fail' })
      return
    }

    mutation.mutate({
      amount: parseFloat(amount),
      type: givingType,
      date,
      description: description || undefined,
    })
  }

  const typeLabels: Record<GivingType, string> = {
    offering: 'Offering',
    tithe: 'Tithe',
    pledge: 'Pledge',
  }

  return (
    <div className="pb-24">
      <Navbar title={`Give - ${typeLabels[givingType]}`} />
      <div className="px-4 mt-20">
        <div className="bg-surface-container-low rounded-xl p-4 mb-4">
          <label className="text-on-surface-variant text-sm mb-2 block">Amount (GHc)</label>
          <Input
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={setAmount}
            className="!text-2xl !font-bold"
          />
        </div>

        <div className="bg-surface-container-low rounded-xl p-4 mb-4">
          <label className="text-on-surface-variant text-sm mb-2 block">Date</label>
          <Input
            type="date"
            value={date}
            onChange={setDate}
          />
        </div>

        <div className="bg-surface-container-low rounded-xl p-4 mb-6">
          <label className="text-on-surface-variant text-sm mb-2 block">Description (optional)</label>
          <Input
            placeholder="e.g. Weekly Tithe"
            value={description}
            onChange={setDescription}
          />
        </div>

        <Button
          block
          color="primary"
          size="large"
          className="!bg-primary-dark !text-on-primary !rounded-xl !h-14"
          loading={mutation.isPending}
          onClick={handleSubmit}
        >
          Record {typeLabels[givingType]}
        </Button>
      </div>
    </div>
  )
}

export default Payment
