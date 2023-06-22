const fs = require('fs')
const data = fs.readFileSync('../server/data/bills.json')
const json = JSON.parse(data)
const history = []

json.forEach(item => {
  const { balance, id, minimumDue, creditLimit } = item
  history.push({ balance, id, minimumDue, creditLimit, date: new Date(2023, 0, 1) })
})

fs.writeFileSync('history.json', JSON.stringify(history, null, 2))
