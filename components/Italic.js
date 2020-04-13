import Text from './Text'

export default (props) =>
  Text({
    ...props,
    style: {
      ...props.style,
      fontStyle: 'italic',
    },
  })
