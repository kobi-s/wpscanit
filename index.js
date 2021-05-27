const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080
const {
    exec
} = require('child_process')

app.use(express.json());
app.use(cors())

app.post('/test', (req, res) => {

    const docker_result = exec(`docker run --rm wpscanteam/wpscan --url ${req.body.url} --random-user-agent -f json`, (error, stdout, stderr) => {

        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);

            return res.sendStatus(500)
        }
        if (stdout) {
            return res.send({
                data: JSON.parse(stdout)
            })
        }
    })
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})