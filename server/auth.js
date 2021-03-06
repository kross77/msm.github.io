var db = require('./db');
var ObjectID = require('mongodb').ObjectID;


//LogIn function
let Auth = (data) => {

    //Take all data

    let Data = db.get().collection("UsersInfo").find().toArray();

    //Processing using promise

    return Data.then(function(docs){

        for (var i = 0; i < docs.length; i++) {
            if (data[0] === docs[i].login && data[1] === docs[i].password) {
                return docs[i];
                break;
            } else {
                continue;
                return "Вы не прошли аутентификацию, попробуйте еще раз!";
            }
        }
    })

}

//Registration function

let Reg = (data) => {

    db.get().collection("UsersInfo").insertOne({login: data[0], password: data[2], email: data[1], id: 1, info:[{"tasks":[]}]});

    return true;
}

//Add new data

let newInfo = (data) => {

    db.get().collection("UsersInfo").find().toArray(function(err,docs){


       for (var i = 0; i < docs.length; i++) {

            if (data[0].login === docs[i].login) {

                // Update database
                db.get().collection("UsersInfo").updateOne(
                    {_id: ObjectID(docs[i]._id)},
                    {$set: {info: data[0].info}},
                    function(err, result){console.log("База обновлена!")}
                )
                break;

            } else {
                continue;
            }
        }
    })
}


module.exports.Auth = Auth;
module.exports.Reg = Reg;
module.exports.newInfo = newInfo;

