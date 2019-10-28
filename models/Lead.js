const firebase = require('../firebase/config');

const stringify = require('csv-stringify');

const create = ({ email, nome, ip, tipo, data_hora }) => {

    const leads = firebase.database().ref('leads');
    const lead = leads.push({email, nome, ip, tipo, data_hora});
    return lead;
};  

const csv = (cb) => {
    const leads = firebase.database().ref('leads');
    const data = [];
    leads.on('value', (snapshot)=> {
        snapshot.forEach((lead) => {
            const {email, nome, ip, tipo, data_hora} = lead.val();
            data.push([email, nome, ip, tipo, data_hora]);
        });
        stringify(data, (err, output) =>{
            cb(output);
        })
    });
}

module.exports = {
    create,
    csv,
};