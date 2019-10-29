const express = require('express');
const bodyParser = require('body-parser');
const Lead  = require('./models/Lead');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/blog', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/blog/leads', (req, res) => {

    // const ip = req.connection.remoteAddress;

    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    const { email, nome, tipo } = req.body; 

    var data = new Date(),
    dia  = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0'+dia : dia,
    mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length == 1) ? '0'+mes : mes,
    anoF = data.getFullYear();
    horaF = data.getHours();
    minF = data.getMinutes();
    segF = data.getSeconds();
    data_hora =  `${anoF}-${mesF}-${diaF} ${horaF}:${minF}:${segF}`;


    Lead.create({email, nome, ip, tipo, data_hora});
    // res.send('Obrigado por se cadastrar');
    res.redirect('https://drive.google.com/file/d/19INq4SdUUDlXd2JJtw6NsDq8PEMv_1rc/view');
});

app.get('/blog/leads.csv', (req, res) => {

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'leads.csv\"' );

    Lead.csv((data) => {
        res.send(data);
    });
});

//app.listen(3000); //DESCOMENTAR PARA RODAR NO LOCAL
app.listen(process.env.PORT);

