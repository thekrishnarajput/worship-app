const { json } = require('body-parser')
const { validationResult } = require('express-validator')
const priestModel = require('../../model/priest/priestModel')

exports.allPriest = (request, response) => {
    priestModel.findOne()
        .then(result => {
            console.log(result)
            return response.status(200).json(result)
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.editPriest = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    priestModel.updateOne({ _id: request.body.priestId },
        {
            $set: {
                status: request.body.status
            }
        })
        .then(result => {
            if (result.modifiedCount) {
                return response.status(200).json({ msg: 'Priest is activated successfully', result })
            }
            else
                return response.status(404).json({ msg: 'Priest could not be activated successfully' })
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}