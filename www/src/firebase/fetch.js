import 'whatwg-fetch'

export default config => (func, body, user) => new Promise((resolve, reject) => {
  const getToken = () => new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json' }
    !user && resolve(headers)
    user && user.getToken().then(token => resolve(Object.assign(headers, {
      'Authorization': `Bearer ${token}`
    }))).catch(err => reject(err))
  })

  getToken().then(headers => fetch(config.functionsURL + func, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }))
  .then(res => res.ok
    ? res.json().then(json => resolve(json)).catch(() => resolve())
    : res.text().then(text => reject(new Error(text || 'Server error'))))
})
