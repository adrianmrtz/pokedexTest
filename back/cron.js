const cron = require('cron')
const https = require('https')

const backendUrl = 'https://pokedex-test-api.onrender.com/getallpokemons'

const job = new cron.CronJob('*/14 * * * *', function() {
  console.log('Restarting server')

  https
    .get(backendUrl, res => {
      if (res.statusCode === 200) {
        console.log('Server restarted')
      }
      else {
        console.error(`failed to restart the server: ${res.statusCode}`)
      }
    })
})

module.exports = {
  start: function() {
    job.start();
    console.log('Job started');
  }
}