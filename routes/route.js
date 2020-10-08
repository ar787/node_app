const {Router} = require("express")
const router = Router()
router.get("/", (req, res)=> {
    res.render("index.pug", {time:req.cookies})
})

router.get("/news/:id", (req, res)=> {
    console.log(req.params.id)
     console.log(req.query)
    res.render("news.pug", {id: req.params.id})
})

router.get("/form", (req, res)=> {
    res.render("form.pug")
})
module.exports = router
