const fs = require('fs')

/**
 * 文件上传
 */
function fileUpload(req, res) {
    console.log(data.toString());

    fs.writeFile('./test.png', data, err => {
        if (err) throw err;

        res.json({
            'code': 0,
            'errMsg': 'OK'
        })
    })
}

module.exports = {
    'POST /api/file/upload': fileUpload
}