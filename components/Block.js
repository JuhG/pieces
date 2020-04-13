import El from './El'

export default ({ edit, ...props }) =>
  El({
    ...props,
    _category: 'block',
  })
