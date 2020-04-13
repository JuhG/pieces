import El from './El'

export default ({ children, edit, ...props }) => {
  // console.log(edit)

  return El({
    ...props,
    _tag: 'input',
    _category: 'text',
    value: children,
    onChange: (e) => {
      edit(props._id, e.target.value)
    },
  })
}
