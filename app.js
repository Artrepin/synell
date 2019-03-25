const express = require('express')
const app = express()
const exphbs  = require('express-handlebars')
const locale = require('locale')
const supported = new locale.Locales(["en", "ru"])
const path = require('path')
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
const multer = require('multer')


const cookieSession = require('cookie-session')
app.use(cookieSession({ name: 'session', keys: ['shakalaka'], maxAge: 1000 * 60 * 60 * 24 * 30 }))

const Sequelize = require('sequelize')
// const Op = Sequelize.Op
const Project = require('./models').project
const Project_ru = require('./models').project_ru
const Project_en = require('./models').project_en

app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'))
app.use('/vue-router', express.static(__dirname + '/node_modules/vue-router/dist'))
app.use('/vue-picture-input', express.static(__dirname + '/node_modules/vue-picture-input/umd'))

var data = {}

function randomString() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function declOfNum(number, titles) {  
    cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

app.all('*', (req, res, next) => {
    var locales = new locale.Locales(req.headers["accept-language"])
    if (!req.session.lang) {
        default_lang = locales.best(supported).toString()
        req.session.lang = require('./locale/' + default_lang + '.json')
    } else {
        req.session.lang = require('./locale/' + req.session.lang.lang + '.json')
    }
    
    data.lang = req.session.lang
    next()
})

app.get('/lang/:lang', (req, res) => {
    req.session.lang = require('./locale/' + req.params.lang + '.json')
    res.redirect('/')
})

app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', async (req, res) => {
    data.projects = await Project.findAll({
        include: [
            {
                model: Project_ru
            },
            {
                model: Project_en
            }
        ]
    })
    data.projects.forEach(element => {
        element.iProjectPeriodString = declOfNum(element.iProjectPeriod, data.lang.case_count_days_string)
        element.iProjectStaffString = declOfNum(element.iProjectStaff, data.lang.case_count_staff_string)
        element.lang = eval("element.project_" + data.lang.lang)
    });
    res.render('welcome', data)
})

app.get('/admin', async (req, res) => {
    res.render('admin')
})
app.post('/admin/project', async (req, res) => {
    var where = null
    if (req.body.search) {
        where = {
            sProjectTitle: {
                [Sequelize.Op.like]: '%' + req.body.search + '%'
            }
        }
    }
    data.projects = await Project.findAll({
        include: [
            {
                model: Project_ru,
                where: where,
            },
            {
                model: Project_en
            }
        ]
    })
    res.json(data)
})
app.post('/admin/ProjectUpload', async (req, res) => {
    var filename = randomString() + '.' + req.headers.extension
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/img/project')
        },
        filename: function (req, file, cb) {
            cb(null, filename)
        }
    })
    var upload = multer({ storage: storage }).single('file')
    upload(req, res, function (err, responce) {
        res.json(req.file)
    })
})
app.post('/admin/ProjectUpdate', async (req, res) => {
    var iProjectID = req.body.project.iProjectID

    if (iProjectID && req.body.project.del) {
        await Project.destroy({
            where: {
                iProjectID: iProjectID
            }
        })
    } else if (iProjectID && !req.body.project.del) {
        await Project.update(req.body.project, {
            where: {
                iProjectID: iProjectID
            }
        })
    } else if (!iProjectID) {
        var new_project = await Project.create(req.body.project)
        iProjectID = new_project.iProjectID
    }

    if (JSON.stringify(req.body.project.project_ru) != "{}") {
        if (req.body.project.project_ru.iProjectID) {
            await Project_ru.update(req.body.project.project_ru, {
                where: {
                    iProjectID: req.body.project.project_ru.iProjectID
                }
            })
        } else {
            req.body.project.project_ru.iProjectID = iProjectID
            await Project_ru.create(req.body.project.project_ru)
        }
    }

    if (JSON.stringify(req.body.project.project_en) != "{}") {
        if (req.body.project.project_en.iProjectID) {
            await Project_en.update(req.body.project.project_en, {
                where: {
                    iProjectID: req.body.project.project_en.iProjectID
                }
            })
        } else {
            req.body.project.project_en.iProjectID = iProjectID
            await Project_en.create(req.body.project.project_en)
        }
    }

    res.json(iProjectID)
})

app.listen(3000, () => {
    console.log('Server is running http://localhost:3000')
})