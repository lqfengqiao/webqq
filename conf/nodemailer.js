var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: 'lq@lq555.cn',
        pass: 'bwyuabisaaigbbba'
    }
});
exports.nodeEmail = transporter;