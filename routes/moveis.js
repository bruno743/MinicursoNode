const express = require('express')
const Movel = require('../models/movel')

const rotas = express.Router()

rotas.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Movel.find({}).exec()
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Movel.create(req.body)
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })
    .put((req, res) => {
        res.statusCode = 403
        res.json({ error: 'operação PUT não suportada em /moveis' })
    })
    .delete((req, res, next) => {
        Movel.remove({}).exec()
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })

rotas.route('/:movelId')
    .get((req, res, next) => {
        Movel.findById(req.params.movelId).exec()
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })
    .post((req, res) => {
        res.statusCode = 403
        res.json({
            error: 'operação POST não suportada em /moveis/' + req.params.movelId
        })
    })
    .put((req, res, next) => {
        Movel.findByIdAndUpdate(
            req.params.movelId,
            { $set: req.body },
            { new: true })
            .exec()
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Movel.findByIdAndRemove(req.params.movelId)
            .exec()
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })

rotas.route('/:movelId/comments')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Movel.findById(req.params.movelId).exec()
            .then((movel) => {
                const { comments = null } = movel || {}
                res.json({ comments })
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Movel.findById(req.params.movelId).exec()
            .then((movel) => {
                if (movel != null) {
                    movel.comments.push(req.body)
                    return movel.save()
                } else {
                    res.json({ error: 'movel não encontrado' })
                }
            })
            .then(res.json)
            .catch(next)
    })
    .put((req, res, next) => {
        const { originalUrl } = req
        res.status(405).json({ error: `operação PUT não suportada em ${originalUrl}` })
    })
    .delete((req, res, next) => {
        Movel.findById(req.params.movelId).exec()
            .then((movel) => {
                if (movel != null) {
                    for (let i = (movel.comments.length - 1); i >= 0; i--) {
                        movel.comments.id(movel.comments[i]._id).remove()
                    }
                    return movel.save()
                } else {
                    res.json({ error: 'movel não encontrado' })
                }
            })
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })

rotas.route('/:movelId/comments/:commentId')
    .all((req, res, next) => {
        res.status(200).append('Content-Type', 'application/json')
        next()
    })
    .get((req, res, next) => {
        Movel.findById(req.params.movelId).exec()
            .then((movel) => {
                if (movel != null && movel.comments.id(req.params.commentId) != null) {
                    res.json(movel.comments.id(req.params.commentId))
                } else if (movel == null) {
                    res.json({ error: 'movel não encontrado' })
                } else {
                    res.json({ error: 'commentário não encontrado' })
                }
            })
            .catch(next)
    })
    .post((req, res) => {
        const { originalUrl } = req
        res.status(405).json({ error: `operação POST não suportada em ${originalUrl}` })
    })
    .put((req, res, next) => {
        Movel.findById(req.params.movelId).exec()
            .then((movel) => {
                if (movel != null && movel.comments.id(req.params.commentId) != null) {
                    if (req.body.rating) {
                        movel.comments.id(req.params.commentId).rating = req.body.rating
                    }
                    if (req.body.comment) {
                        pizza.comments.id(req.params.commentId).comment = req.body.comment
                    }
                    return movel.save()
                } else if (movel == null) {
                    res.json({ error: 'movel não encontrado' })
                } else {
                    res.json({ error: 'commentário não encontrado' })
                }
            })
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Movel.findById(req.params.movelId).exec()
            .then((movel) => {
                if (movel != null && movel.comments.id(req.params.commentId) != null) {
                    movel.comments.id(req.params.commentId).remove()
                    return movel.save()
                } else if (movel == null) {
                    res.json({ error: 'movel não encontrado' })
                } else {
                    res.json({ error: 'commentário não encontrado' })
                }
            })
            .then((movel) => {
                res.json(movel)
            })
            .catch(next)
    })

module.exports = rotas