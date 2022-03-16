const { json } = require('body-parser')
const { validationResult } = require('express-validator')
const packageItem = require('../../model/admin/packageItemModel')

exports.addPackageItem = (request, response, next) => {
    console.log(request.body);
    console.log(request.files);
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    var packItemImagePath1 = "";
    var packItemImagePath2 = "";
    var packItemImagePath3 = "";
    var packItemImagePath4 = "";
    if (request.files.length > 0) {
        packItemImagePath1 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[0].filename
        if (request.files.length > 1) {
            packItemImagePath2 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[1].filename
            if (request.files.length > 2) {
                packItemImagePath3 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[2].filename
                if (request.files.length > 3) {
                    packItemImagePath4 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[3].filename
                }
            }
        }
    }
    packageItem.create({
        packItemName: request.body.packItemName,
        packItemPrice: request.body.packItemPrice,
        packItemQty: request.body.packItemQty,
        packItemDescription: request.body.packItemDescription,
        packItemImagePath1: packItemImagePath1,
        packItemImagePath2: packItemImagePath2,
        packItemImagePath3: packItemImagePath3,
        packItemImagePath4: packItemImagePath4,
        catId: request.body.catId
    })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(403).json({ msg: "Something went wrong! Package Item not added." });
        });
}

exports.allPackageItems = (request, response) => {
    packageItem.find()
        .then(result => {
            console.log(result)
            return response.status(200).json(result)
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.editPackageItem = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    var packItemImagePath1 = "";
    var packItemImagePath2 = "";
    var packItemImagePath3 = "";
    var packItemImagePath4 = "";
    if (request.files.length > 0) {
        packItemImagePath1 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[0].filename
        if (request.files.length > 1) {
            packItemImagePath2 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[1].filename
            if (request.files.length > 2) {
                packItemImagePath3 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[2].filename
                if (request.files.length > 3) {
                    packItemImagePath4 = "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[3].filename
                }
            }
        }
    }
    packageItem.updateOne({
        _id: request.params.packItemId,
        $set: {
            packItemName: request.body.packItemName,
            packItemPrice: request.body.packItemPrice,
            packItemDescription: request.body.packItemDescription,
            packItemImagePath1: "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[0].filename,
            packItemImagePath2: "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[1].filename,
            packItemImagePath3: "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[2].filename,
            packItemImagePath4: "https://worshipbymukesh.herokuapp.com/packageItem/images/" + request.files[3].filename,
            catId: request.body.catId
        }
    })
        .then(result => {
            if (result.modifiedCount)
                return response.status(204).json({ msg: 'Package Item updated successfully' });
            else
                return response.status(404).json({ msg: 'Package Item could not be updated successfully' });
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.discardPackageItem = (request, response)=>{
    packageItem.deleteOne({_id: request.params.packItemId})
    .then(result => {
        console.log("Params ID "+ request.params.packItemId)
        if(result.deletedCount){
            console.log("Result "+result)
            return response.status(202).json({ msg: 'Package Item deleted successfully'})
        }
        else
            return response.status(204).json({ msg: 'Package Item could not be deleted successfully'})
    })
    .catch(err => {
        console.log("Params ID in Catch "+ request.params.catId)
        console.log("Error "+err)
        return response.status(500).json({ msg: "Package Item Internal Server Error"})
    })
}