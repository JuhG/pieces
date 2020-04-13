import Block from './Block'

export default (props) =>
  Block({
    ...props,
    _tag: 'p',
    _accepts: ['text'],
  })
