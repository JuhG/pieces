function parse({ blocks, parent = null }) {
  return blocks.map(({ type, ...props }, index) => {
    if ('undefined' === typeof props.children) {
      throw new Error('The key children is required for a block')
    }

    let Component
    try {
      Component = require(`../components/${type}`).default
    } catch (e) {
      throw new Error("The provided component doesn't exist")
    }

    const _id = null === parent ? String(index) : parent + '_' + index

    if (Array.isArray(props.children)) {
      props.children = parse({
        blocks: props.children,
        parent: _id,
      })

      // const preRendered = Component({})
      // if (Array.isArray(preRendered._accepts)) {
      //   if (
      //     !props.children.every((child) => {
      //       return preRendered._accepts.indexOf(child._category) > -1
      //     })
      //   ) {
      //     throw new Error('Type is not supported')
      //   }
      // }
    }

    return {
      Component,
      props: { key: index, _type: type, _id, ...props },
    }
  })
}

function render(list, edit) {
  return list.map(({ Component, props }) => {
    let children = props.children

    if (Array.isArray(children)) {
      children = render(children, edit)
    }

    return Component({
      ...props,
      children,
      edit,
    })
  })
}

function strip(list) {
  return list.map(({ props: { _type, children } }) => {
    if (Array.isArray(children)) {
      children = strip(children)
    }

    return { type: _type, children }
  })
}

export default {
  parse: (options) => parse(options),
  render: (list, edit) => {
    return <div _type="Wrapper">{render(list, edit)}</div>
  },
  strip: (list) => {
    return { blocks: strip(list) }
  },
}
