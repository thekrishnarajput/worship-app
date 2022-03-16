const { json } = require('body-parser')
const { validationResult } = require('express-validator')
const PackageItem = require('../../model/admin/packageItemModel')

exports.addPackages = (request, response, next) => {
    console.log(request.body);
    console.log("Packages Image Path=> " + request.file.filename);
    console.log(request.file);
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    Packages.create({
        packName: request.body.packName,
        packImagePath: "http://localhost:3000/packageItem/images/" + request.file.filename
    })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(403).json({ msg: "Something went wrong! Packages not added." });
        });
}

exports.allPackages = (request, response) => {
    Packages.find()
        .then(result => {
            console.log(result)
            return response.status(200).json(result)
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.editPackages = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    Packages.updateOne({ _id: request.body.packId },
        {
            $set: {
                packName: request.body.packName,
                packImagePath: "http://localhost:3000/packageItem/images/" + request.file.filename
            }
        })
        .then(result => {
            if (result.modifiedCount) {
                console.log("Modified Count inside")
                return response.status(201).json({ msg: 'Packages updated successfully', result});
            } else
                return response.status(404).json({ msg: 'Packages could not be updated successfully' });
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.discardPackages = (request, response) => {
    Packages.deleteOne({ _id: request.params.packId })
        .then(result => {
            console.log("Params ID " + request.params.packId)
            if (result.deletedCount) {
                console.log("Result " + result)
                return response.status(202).json({ msg: 'Packages deleted successfully' })
            }
            else
                return response.status(204).json({ msg: 'Packages could not be deleted successfully' })
        })
        .catch(err => {
            console.log("Params ID in Catch " + request.params.packId)
            console.log("Error " + err)
            return response.status(500).json({ msg: "Packages Internal Server Error" })
        })
}