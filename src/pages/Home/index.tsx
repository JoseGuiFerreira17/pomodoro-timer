import { Play } from 'phosphor-react'
import {
  CountButton,
  CountContainer,
  ForContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <ForContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome ao seu projeto"
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

        <CountButton type="submit">
          <Play size={24} />
          Começar
        </CountButton>
      </form>
    </HomeContainer>
  )
}
