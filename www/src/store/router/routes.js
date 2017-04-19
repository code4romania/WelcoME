import Route from 'route-parser'
import qs from 'query-string'

// insert all parametric routes here
const routes = []

// Ex:
// routes.push('/verifyEmail(/:code)/:code2') -> /verifyEmail/123/abd -> code = 123, code2 = abd

// extend all params and querystring variables into route
export default route => routes.map(r => new Route(r)).reduce((acc, r) => ({
  ...acc,
  ...r.match(route.pathname)
}), {
  ...route,
  ...qs.parse(route.search)
})
