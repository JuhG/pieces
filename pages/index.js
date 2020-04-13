import { useEffect } from 'react'
import lib from '../library/index'
import useData from '../pieces/useData'

export default () => {
  const { init, state, add, edit } = useData()

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          add({
            type: 'Paragraph',
            children: [
              {
                type: 'Text',
                children: 'Simple Message',
              },
              {
                type: 'Italic',
                children: 'Fancy Message',
              },
            ],
          })
        }}
      >
        Add new block
      </button>

      <h1>Output</h1>
      {lib.render(state, edit)}
    </div>
  )
}
