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

interface CycleFormData {
  task: string
  timer: number
}

export function Home() {
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

  function handleCreateNewCycle(data: CycleFormData) {
    reset()
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <CountButton type="submit" disabled={!task}>
          <Play size={24} />
          Começar
        </CountButton>
      </form>
    </HomeContainer>
  )
}
