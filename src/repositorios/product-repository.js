"use strict";

const mongoose = require("mongoose");

const Product = mongoose.model("Product");

exports.get = async () => {
    const res = await Product.find(
        { active: true },
        "title price slug description tags image"
    );
    return res;
};

exports.getBySlug = async slug => {
    const res = await Product.findOne(
        {
            slug: slug,
            active: true
        },
        "title slug description price tags image"
    );
    return res;
};

exports.getById = async id => {
    var res = await Product.findById(id);
    return res;
};

exports.getByTag = async tag => {
    const res = await Product.find(
        {
            tags: tag,
            active: true
        },
        "title slug description price tags image"
    );
    return res;
};

exports.create = async data => {
    let product = new Product(data);
    return product.save();
};

exports.update = async (id, data) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price
        }
    });
};

exports.delete = async id => {
    return Product.findOneAndRemove(id);
};
