const express = require('express');
const app = express();
const dir = '/home/kozlovns/prj/dogis/';
const https = require('https');
const fs = require('fs');
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let version = 1;

const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(cookieParser());

app.use(function (req, res, next) {
    version = req.cookies.version;
    if (version === undefined) {
        version = randomIntFromInterval(1, 4);
        res.cookie('version', version, { maxAge: 999999, httpOnly: false });
    }
    next();
});

app.use("/assets/", express.static(`${dir}v${4}/src/assets/`));
app.use("/df/", express.static(`${dir}v${4}/src/df/`));
app.use("/sass/", express.static(`${dir}v${4}/src/sass/`));
app.use("/src/", express.static(`${dir}v${4}/src/`));
app.use("/common/js/", express.static(`${dir}common/js/`));

app.get('/main/:slug?', (req, res) => {    
    res.sendFile(`${dir}v${version}/src/pages/main/index.html`);
});

app.get('/pets/:slug?', (req, res) => {
    res.sendFile(`${dir}v${version}/src/pages/pets/index.html`);
});

app.get('/contact/:slug?', (req, res) => {
    res.sendFile(`${dir}v${version}/src/pages/contact/index.html`);
});

app.get('/',(req,res)=>{
    res.redirect('/main/');
})

app.use("/main/", express.static(`${dir}v${4}/src/pages/main/`));
app.use("/pets/", express.static(`${dir}v${4}/src/pages/pets/`));
app.use("/contact/", express.static(`${dir}v${4}/src/pages/contact/`));

const proxy_db = {
    target: "http://localhost:3000",
    changeOrigin: true,
    pathRewrite:{
        ['^/fpets']: '/pets',
    }
}

const proxy = createProxyMiddleware(proxy_db);
app.use('/fpets', proxy);

const hhtps_op = {
    key:fs.readFileSync('/etc/ssl/private/kknss-key.pem'),
    cert:fs.readFileSync('/etc/ssl/certs/kknss-cert.crt'),
    ca:[
        fs.readFileSync('/etc/ssl/mdl/kknss-mdl.crt'),
        fs.readFileSync('/etc/ssl/req/kknss-req.csr'),
        fs.readFileSync('/etc/ssl/root/kknss-root.crt')
    ]
}
const httpsServer = https.createServer(hhtps_op, app);
httpsServer.listen(8080,()=>{
    console.log(`is started on ${8080}`)
});




