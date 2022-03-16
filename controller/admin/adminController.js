const {json} = require('body-parser')
const {validationResult} = require('express-validator')
const Admin = require('../../model/admin/adminModel')

exports.signIn = (request, response) => {
    console.log(request.body)
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).json({errors: errors.array()})
    }
     Admin.findOne({email:request.body.email,password:request.body.password})
    .then(result => {
        console.log(result);
        if(result){
        console.log("RESULT : "+result)
        return response.status(200).json(result);
        }
        else{
            return response.status(404).json({msg: "Invalid credentials"})
        }
    })
    .catch(error => {
        console.log(error);
        return response.status(203).json({msg: "Login Failed, Try again!"})
    });
}