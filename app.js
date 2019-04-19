const express = require('express')
const app = express()
// const http = require('http').createServer(app)
const exphbs  = require('express-handlebars')
const locale = require('locale')
const supported = new locale.Locales(["en", "ru"])
const path = require('path')
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
const multer = require('multer')
require('dotenv').config()
app.locals.env = process.env;

const cookieSession = require('cookie-session')
app.use(cookieSession({ name: 'session', keys: ['shakalaka'], maxAge: 1000 * 60 * 60 * 24 * 30 }))

const Sequelize = require('sequelize')
// const Op = Sequelize.Op
const Project = require('./models').project
const Project_ru = require('./models').project_ru
const Project_en = require('./models').project_en
const User = require('./models').user

app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))
app.use('/vue-session', express.static(__dirname + '/node_modules/vue-session'))
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

// if (process.env.NODE_ENV != 'development') {
//     app.use(function(req, res, next) {
//         if (req.secure) {
//             next()
//         } else {
//             res.redirect(301, 'https://' + req.headers.host + req.url)
//         }
//     })
// }

// app.all('*', (req, res, next) => {
//     if (req.headers.host.match(/^www/) !== null ) {
//         res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url)
//     } else {
//         next()
//     }
// })

app.all('*', (req, res, next) => {
    var locales = new locale.Locales(req.headers["accept-language"])
    if (!req.session.lang) {
        req.session.lang = locales.best(supported).toString()
        // req.session.lang = require('./locale/' + default_lang + '.json')
    } else {
        
    }
    
    
    data.lang = require('./locale/' + req.session.lang + '.json')

    next()
})

app.get('/lang/:lang', (req, res) => {
    req.session.lang = req.params.lang
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
app.post('/mail', async (req, res) => {

    var request = require('request')

    var custom_fields_phone = {}
    if (req.body.phone) {
        custom_fields_phone.id = 441685
        custom_fields_phone.values = []
        custom_fields_phone.values.push({
            value: Number(req.body.phone.replace(/\D+/g,"")),
            enum: "WORK"
        })
    }

    var custom_fields_email = {}
    if (req.body.email) {
        custom_fields_email.id = 441687
        custom_fields_email.values = []
        custom_fields_email.values.push({
            value: req.body.email,
            enum: "WORK"
        })
    }

    var custom_fields_nameform = {}
    if (req.body.form) {
        custom_fields_nameform.id = 637407
        custom_fields_nameform.values = []
        custom_fields_nameform.values.push({
            value: req.body.form,
            enum: "WORK"
        })
    }

    var custom_fields_scope = {}
    if (req.body.scope) {
        custom_fields_scope.id = 637143
        custom_fields_scope.values = []
        custom_fields_scope.values.push({
            value: req.body.scope,
            enum: "WORK"
        })
    }

    var custom_fields_message = {}
    if (req.body.message) {
        custom_fields_message.id = 637067
        custom_fields_message.values = []
        custom_fields_message.values.push({
            value: req.body.message,
            enum: "WORK"
        })
    }

    var amoDataJson = {
        json: {
            add: [
                {
                    source_name: "Новая заявка",
                    created_at: new Date().getTime(),
                    incoming_entities: {
                        leads: [
                            {
                                name: "Новая заявка",
                                tags: "synell.com"
                            }
                        ],
                        contacts: [
                            {
                                name: (req.body.user) ? req.body.user : "Имя не указано",
                                custom_fields: [ custom_fields_phone, custom_fields_email, custom_fields_message, custom_fields_scope, custom_fields_nameform ]
                            }
                        ]
                    },
                    incoming_lead_info: {
                        form_id: "1",
                        form_page: "https://synell.com",
                    }
                }
            ]
        }
    }

    request.post('https://' + process.env.AMOCRM_DOMAIN + '.amocrm.ru/api/v2/incoming_leads/form?login=' + process.env.AMOCRM_LOGIN + '&api_key=' + process.env.AMOCRM_HASH + '&', amoDataJson, function (error, response, body) {
        res.send(200)
    })


    
})



app.get('/admin', async (req, res) => {
    res.render('admin')
})
app.post('/admin/auth', async (req, res) => {
    var sUserEmail = req.body.name
    var sUserPass = req.body.password
    var user = await User.findAll({
        where: {
            sUserEmail: sUserEmail,
            sUserPass: sUserPass
        }
    })
    if (user[0]) {
        res.json({
            iUserID: user[0].iUserID,
            sUserEmail: user[0].sUserEmail
        })
        // var admin = {
        // }
        // req.session.admin = admin
        // app.use(cookieSession({ name: 'admin', keys: ['shakalaka'], maxAge: 1000 * 60 * 60 * 24 * 30 }))
    } else {
        res.json(false)
    }    
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

// http.listen(process.env.PORT, process.env.DNS, () => {
//     console.log("Server is running...")
// })
// if (process.env.NODE_ENV === 'production') {
//     console.log('production...')
//     const options = {
//         key: fs.readFileSync('encryption/privkey1.pem'),
//         cert: fs.readFileSync('encryption/cert1.pem')
//     }
//     const https = require('https').createServer(options, app)
//     https.listen(443)
// }


// var https = require('https');
// var fs = require('fs');
// var https_options = {
//   key: fs.readFileSync("encryption/www_synell_com.key"),
//   cert: fs.readFileSync("encryption/www_synell_com.crt"),
//   ca: [
//           fs.readFileSync('encryption/www_synell_com.ca-bundle')
//        ]
// };

// https.createServer(https_options, function (req, res) {

//     res.writeHead(200);
   
//     res.end("Welcome to Node.js HTTPS Servern");
   
//    }).listen(8443)


app.listen(process.env.PORT, () => {
    console.log('Server is running http://localhost:' + process.env.PORT)
})
