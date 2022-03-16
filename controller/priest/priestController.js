const { json } = require('body-parser')
const { validationResult } = require('express-validator')
const priestModel = require('../../model/priest/priestModel')


exports.signup = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(403).json({ errors: errors.array() })
    }
    priestModel.create({
        priestName: request.body.priestName,
        email: request.body.email,
        password: request.body.password,
        mobile: request.body.mobile,
        gender: request.body.gender,
        profilePic: "http://localhost:3000/priest/media" + request.file.filename,
        status: false
    })
        .then(result => {
            console.log(result)
            return response.status(200).json(result)
        }).catch((err) => {
            return response.status(500).json({ msg: "Something went wrong" })
        })
}

exports.signin = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(403).json({ errors: errors.array() })
    }
    console.log(request.body)
    var email = request.body.email
    priestModel.findOne({}, function (err, priest) {
        priest.comparePassword(request.body.password, (error, isMatch) => {
            if (error) throw error
            console.log("Priest Status: "+priest.status)
            if (priest.status && isMatch) {
                console.log('Logged in')
                return response.status(200).json({ msg: "Account Status is: " +"'"+ priest.status + "'" + " And Logged in successfully" })
            }
            else
                return response.status(500).json({ msg: "Login failed, invalid credentials or account is not activated yet." })
        })
    }).then(result => { }).catch(err => { })
}

exports.profile = (request, response) => {
    let flag = false
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(403).json({ errors: errors.array() })
    }
    priestModel.findOne({},function (err, priest) {
        priest.comparePassword(request.body.oldPassword, (error, match) => {
            if (error) throw error
        })
    }).then(result => { }).catch(err => { })
        if(result.password == request.body.password) {
            let oldPassword = request.body.oldPassword
            request.body.password = oldPassword
            return response.status(200).json(result)
        }
        console.log(request.body);
        /*priestModel.findOne( (err, priest)=> {
                priest.comparePassword(request.body.oldPassword, (error, match) => {
                    console.log("Priest Status: "+priest.password)
                    console.log("Is Match: "+match)
                    if (match) {
                        flag = true
                        console.log("You can change your password flag "+match+ " " + flag)
                        if(flag){
                            newPassword = request.body.newPassword
                        priestModel.updateOne({
                            password: newPassword,
                            // pujanName: request.body.pujanName,
                            // pujanMedia: "http://localhost:3000/priest/media" + request.file.filename
                       })
                            .then(result => {
                                console.log("Result in catch for updateOne "+result)
                                return response.status(200).json(result)
                            }).catch((err) => {
                                console.log("Error in catch for updateOne "+err)
                                return response.status(500).json({ msg: "Something went wrong" })
                            });
                        }
                        //return response.status(200).json({ msg: "Password Matched : " +"'"+ priest.status + "'" + " You can change the password" })
                    }
                    else{
                        console.log("Error in else you can't change the password"+error)
                        //return response.status(500).json({ msg: "Password not Matched : " +"'"+ priest.status + "'" + " You can't change the password" })
                    }
                })
            }).then(result => {
            console.log("result"+result);
          
         }).catch(err => { 
             console.log(err);
             // return response.status(200).json({err:err.array});
         })
        */


    // if(flag){
    //     var newPassword1 = request.body.newPassword
    //     console.log("new password assigned to variable")
    // }
    // else{
    //     return response.status(500).json({msg: "Password did not match"})
    // }
    
}