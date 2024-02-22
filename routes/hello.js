const express = require("express")
const router = express.Router();

router.get('/hello', async function(req, res) {
     res.send("HELLO THERE")
})

module.exports = router;