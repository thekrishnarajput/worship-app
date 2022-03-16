const { json } = require('body-parser')
const { validationResult } = require('express-validator')
const Category = require('../../model/admin/categoryModel')

exports.addCategory = (request, response, next) => {
    console.log(request.body);
    console.log("Category Image Path=> " + request.file.filename);
    console.log(request.file);
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    Category.create({
        catName: request.body.catName,
        catImagePath: "https://worshipbymukesh.herokuapp.com/category/media/" + request.file.filename
    })
        .then(result => {
            return response.status(201).json(result);
        })
        .catch(err => {
            return response.status(403).json({ msg: "Something went wrong! Category not added." });
        });
}

exports.allCategories = (request, response) => {
    Category.find()
        .then(result => {
            console.log(result)
            return response.status(200).json(result)
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.editCategory = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    Category.updateOne({ _id: request.body.catId },
        {
            $set: {
                catName: request.body.catName,
                catImagePath: "https://worshipbymukesh.herokuapp.com/category/images/" + request.file.filename
            }
        })
        .then(result => {
            if (result.modifiedCount) {
                console.log("Modified Count inside")
                return response.status(201).json({ msg: 'Category updated successfully', result});
            } else
                return response.status(404).json({ msg: 'Category could not be updated successfully' });
        })
        .catch(err => {
            return response.status(500).json({ msg: "Internal Server Error" })
        })
}

exports.discardCategory = (request, response) => {
    Category.deleteOne({ _id: request.params.catId })
        .then(result => {
            console.log("Params ID " + request.params.catId)
            if (result.deletedCount) {
                console.log("Result " + result)
                return response.status(202).json({ msg: 'Category deleted successfully' })
            }
            else
                return response.status(204).json({ msg: 'Category could not be deleted successfully' })
        })
        .catch(err => {
            console.log("Params ID in Catch " + request.params.catId)
            console.log("Error " + err)
            return response.status(500).json({ msg: "Category Internal Server Error" })
        })
}