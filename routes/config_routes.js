const os = require('os');
const express = require('express');
const router  = express.Router();

// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

// default config route
router.get('/', (req, res) => {
    res.status(200).send();
});

// retrieve current container hostname
router.get('/gethostname', (req, res) => {
    let hostname = os.hostname();
    if (hostname == null) {
        res.status(500).send('ERROR: Unable to retrieve host.');
    } else {
        res.status(200).send(hostname);
    }
});

module.exports = router;
