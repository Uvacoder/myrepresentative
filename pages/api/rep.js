import { find } from 'lodash'

export default (req, res) => {
  const { address } = req.query
  const payload = {
    key: 'AIzaSyAC098ZQK-jP_Q5fRpG_0of9LCTvOtdEFA',
    address,
    fields: 'divisions,officials',
    includeOffices: true.toString()
  }
  const query = Object.keys(payload)
    .map(key => [key, payload[key]].map(encodeURIComponent).join('='))
    .join('&')
  const keyMatch = key =>
    key.match(
      /ocd-division\/country:us\/(?:state|district):(\w+)(?:\/cd:)(\d+)/
    )
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?${query}`
  fetch(url)
    .then(civic => civic.json())
    .then(civic => {
      const divKey = find(Object.keys(civic.divisions), key => keyMatch(key))
      const record = civic.divisions[divKey]
      const rep = civic.officials[record.officeIndices[0] + 1]
      res.json(rep)
    })
    .catch(e => {
      console.error(e)
    })
}
