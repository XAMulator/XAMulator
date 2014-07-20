//var recipies = require('../data/recipiesData.js');

exports.list = function (req, res) {
    var parts = req.originalUrl.split('/');
    var kind = parts[parts.length - 1];

    // res.render('home', {
    //     recipies: {
    //         list: homes[kind],
    //         kind: homes.homeTypeName[kind] + ' Homes'
    //     }
    // });

}
