const express = require('express')
const Promo = require('../models/promocao')

const rotas = express.Router()

rotas.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Promo.find({}).exec()
            .then((promocao) => {
                res.json(promocao)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Promo.create(req.body)
            .then((promocao) => {
                res.json(promocao)
            })
            .catch(next)
    })
    .put((req, res) => {
        res.statusCode = 403
        res.json({ error: 'operação PUT não suportada em /rotasPromo' })
    })
    .delete((req, res, next) => {
        Promo.remove({}).exec()
            .then((promocao) => {
                res.json(promocao)
            })
            .catch(next)
    })

rotas.route('/:promoId')
    .get((req, res, next) => {
        Promo.findById(req.params.promoId).exec()
            .then((promocao) => {
                res.json(promocao)
            })
            .catch(next)
    })
    .post((req, res) => {
        res.statusCode = 403
        res.json({
            error: 'operação POST não suportada em /rotasPromo/' + req.params.promoId
        })
    })
    .put((req, res, next) => {
        Promo.findByIdAndUpdate(
            req.params.promoId,
            { $set: req.body },
            { new: true })
            .exec()
            .then((promocao) => {
                res.json(promocao)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Promo.findByIdAndRemove(req.params.promoId)
            .exec()
            .then((promocao) => {
                res.json(promocao)
            })
            .catch(next)
    })

module.exports = rotas