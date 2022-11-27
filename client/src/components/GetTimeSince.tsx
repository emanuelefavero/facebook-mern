import { useState, useEffect } from 'react'

interface Props {
  createdAt: string
}

function useGetTimeSince({ createdAt }: Props) {
  const [output, setOutput] = useState('')

  const date = new Date(createdAt)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDay = now.getDate()
  const nowHour = now.getHours()
  const nowMinute = now.getMinutes()

  useEffect(() => {
    if (
      year === nowYear &&
      month === nowMonth &&
      day === nowDay &&
      hour === nowHour &&
      minute === nowMinute
    ) {
      setOutput('Just now')
    } else if (
      year === nowYear &&
      month === nowMonth &&
      day === nowDay &&
      hour === nowHour
    ) {
      setOutput(`${nowMinute - minute} minutes ago`)
    } else if (year === nowYear && month === nowMonth && day === nowDay) {
      setOutput(`${nowHour - hour} hrs`)
    } else if (year === nowYear && month === nowMonth && day === nowDay - 1) {
      setOutput('Yesterday')
    } else if (year === nowYear && month === nowMonth) {
      setOutput(`${nowDay - day} days`)
    } else if (year === nowYear && month === nowMonth - 1) {
      setOutput('Last month')
    } else if (year === nowYear) {
      setOutput(`${nowMonth - month} months`)
    } else if (year === nowYear - 1) {
      setOutput(`Last year`)
    } else if (year < nowYear) {
      setOutput(`${nowYear - year} years`)
    } else {
      setOutput('')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{output}</>
}

export default useGetTimeSince
