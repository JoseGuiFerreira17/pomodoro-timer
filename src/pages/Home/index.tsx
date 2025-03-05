import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountButton,
  CountContainer,
  ForContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

interface CycleFormData {
  task: string
  timer: number
}

interface Cycle {
  id: string
  task: string
  timer: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [currentCycle, setCurrentCycle] = useState<string | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const { handleSubmit, register, watch, reset } = useForm<CycleFormData>({
    resolver: zodResolver(
      zod.object({
        task: zod.string().min(3, 'Nome do projeto muito curto'),
        timer: zod
          .number()
          .int()
          .min(5, 'Tempo mínimo é 5 minutos')
          .max(60, 'Tempo máximo é 60 minutos'),
      })
    ),
    defaultValues: {
      task: '',
      timer: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === currentCycle)

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setElapsedTime(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }
  }, [activeCycle])

  function handleCreateNewCycle(data: CycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      timer: data.timer,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setCurrentCycle(newCycle.id)

    reset()
  }

  const totalSeconds = activeCycle ? activeCycle.timer * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - elapsedTime : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <ForContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome ao seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="List" />
            <option value="List" />
            <option value="List" />
          </datalist>
          <label htmlFor="timer">Durante</label>
          <MinutesInput
            id="timer"
            type="number"
            placeholder="00"
            step={5}
            max={60}
            min={5}
            {...register('timer', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </ForContainer>
        <CountContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountContainer>

        <CountButton type="submit" disabled={!task}>
          <Play size={24} />
          Começar
        </CountButton>
      </form>
    </HomeContainer>
  )
}
