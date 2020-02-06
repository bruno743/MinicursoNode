const express = require('express')
const Combo = require('../models/combo')

const rotas = express.Router()

rotas.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Combo.find({}).exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Combo.create(req.body)
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })
    .put((req, res) => {
        res.statusCode = 403
        res.json({ error: 'operação PUT não suportada em /rotasCombo' })
    })
    .delete((req, res, next) => {
        Combo.remove({}).exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })

rotas.route('/:comboId')
    .get((req, res, next) => {
        Combo.findById(req.params.comboId).exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })
    .post((req, res) => {
        res.statusCode = 403
        res.json({
            error: 'operação POST não suportada em /rotasCombo/' + req.params.comboId
        })
    })
    .put((req, res, next) => {
        Combo.findByIdAndUpdate(
            req.params.comboId,
            { $set: req.body },
            { new: true })
            .exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Combo.findByIdAndRemove(req.params.comboId)
            .exec()
            .then((combo) => {
                res.json(combo)
            })
            .catch(next)
    })

module.exports = rotas