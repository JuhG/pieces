import React, { useContext, useReducer } from 'react'
import lib from '../library/index'

const Context = React.createContext({})

export const Provider = ({ children, initial = { blocks: [] } }) => {
  const [state, dispatch] = useReducer(reducer, initial)

  return <Context.Provider value={{ state, dispatch }} children={children} />
}

function map(list, id, text) {
  return list.map((block) => {
    if (block.props._id.length < id.length) {
      if (Array.isArray(block.props.children)) {
        block.props.children = map(block.props.children, id, text)
      }
    } else {
      if (id === block.props._id) {
        block.props.children = text
      }
    }

    return block
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EDIT':
      const nnn = lib.strip(
        map(lib.parse(state), action.payload.id, action.payload.text)
      )

      if ('undefined' !== typeof window) {
        localStorage.setItem('dd_initial', JSON.stringify(nnn))
      }

      return nnn

    case 'ADD':
      const nnnn = { blocks: [...state.blocks, action.payload.block] }

      if ('undefined' !== typeof window) {
        localStorage.setItem('dd_initial', JSON.stringify(nnnn))
      }

      return nnnn

    case 'INITIAL':
      let initial = { blocks: [] }

      if ('undefined' !== typeof window) {
        initial = localStorage.getItem('dd_initial')

        if (!initial) {
          initial = { blocks: [] }
        } else {
          initial = JSON.parse(initial)
        }
      }

      return initial

    default:
      throw new Error('Invalid action')
  }
}

export default () => {
  const { dispatch, state } = useContext(Context)

  const edit = (id, text) => {
    dispatch({
      type: 'EDIT',
      payload: {
        id,
        text,
      },
    })
  }

  const add = (block, parent = null) => {
    dispatch({
      type: 'ADD',
      payload: {
        block,
        parent,
      },
    })
  }

  return {
    state: lib.parse(state),
    edit,
    add,
    init: () => {
      dispatch({
        type: 'INITIAL',
      })
    },
  }
}
