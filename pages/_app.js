import { Provider } from '../pieces/useData'

export default ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
