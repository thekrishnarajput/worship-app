const { json } = require('body-parser')
const { validationResult } = require('express-validator')
const Product = require('../../model/admin/productModel')

exports.addProduct = (request, response, next) => {
    console.log(request.body);
    console.log(request.files);
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    var proImagePath1 = "";
    var proImagePath2 = "";
    var proImagePath3 = "";
    var proImagePath4 = "";
    if (request.files.length > 0) {
        proImagePath1 = "http://localhost:3000/product/images/" + request.files[0].filename
        if (request.files.length > 1) {
            proImagePath2 = "http://localhost:3000/product/images/" + request.files[1].filename
            if (request.files.length > 2) {
                proImagePath3 = "http://localhost:3000/product/images/" + request.files[2].filename
                if (request.files.length > 3) {
                    proImagePath4 = "http://localhost:3000/product/images/" + request.files[3].filename
                }
            }
        }
    }
    Product.create({
        proName: request.body.proName,
        proPrice: request.body.proPrice,
        proQty: request.body.proQty,
        proDescription: request.body.proDescription,
        proImagePath1: proImagePath1,
        proImagePath2: proImagePath2,
        proImagePath3: proImagePath3,
        proImagePath4: proImagePath4,
        catId: request.body.catId
    })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(403).json({ msg: "Something went wrong! Product not added." });
        });
}

exports.allProducts = (request, response) => {
    Product.find()
        .then(result => {
            console.log(result)
            return response.status(200).json(result)
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.editProduct = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    var proImagePath1 = "";
    var proImagePath2 = "";
    var proImagePath3 = "";
    var proImagePath4 = "";
    if (request.files.length > 0) {
        proImagePath1 = "http://localhost:3000/product/images/" + request.files[0].filename
        if (request.files.length > 1) {
            proImagePath2 = "http://localhost:3000/product/images/" + request.files[1].filename
            if (request.files.length > 2) {
                proImagePath3 = "http://localhost:3000/product/images/" + request.files[2].filename
                if (request.files.length > 3) {
                    proImagePath4 = "http://localhost:3000/product/images/" + request.files[3].filename
                }
            }
        }
    }
    Product.updateOne({
        _id: request.params.proId,
        $set: {
            proName: request.body.proName,
            proPrice: request.body.proPrice,
            proDescription: request.body.proDescription,
            proImagePath1: "http://localhost:3000/product/images/" + request.files[0].filename,
            proImagePath2: "http://localhost:3000/product/images/" + request.files[1].filename,
            proImagePath3: "http://localhost:3000/product/images/" + request.files[2].filename,
            proImagePath4: "http://localhost:3000/product/images/" + request.files[3].filename,
            catId: request.body.catId
        }
    })
        .then(result => {
            if (result.modifiedCount)
                return response.status(204).json({ msg: 'Product updated successfully' });
            else
                return response.status(404).json({ msg: 'Product could not be updated successfully' });
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.discardProduct = (request, response)=>{
    Product.deleteOne({_id: request.params.proId})
    .then(result => {
        console.log("Params ID "+ request.params.proId)
        if(result.deletedCount){
            console.log("Result "+result)
            return response.status(202).json({ msg: 'Product deleted successfully'})
        }
        else
            return response.status(204).json({ msg: 'Product could not be deleted successfully'})
    })
    .catch(err => {
        console.log("Params ID in Catch "+ request.params.catId)
        console.log("Error "+err)
        return response.status(500).json({ msg: "Product Internal Server Error"})
    })
}