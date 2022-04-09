import { Middleware } from 'flash-wolves'

const interceptor: Middleware = async (req, res) => {
  const { options } = req.route
  console.log(`beforeRunRoute:${req.method} - ${req.url}`)
  if (options) {
    console.log(`route-ops:${JSON.stringify(options)}`)
  }
}
export default interceptor
