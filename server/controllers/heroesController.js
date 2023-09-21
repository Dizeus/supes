const pool = require("../db");
const {v4: uuidv4} = require("uuid");
const ApiError = require('../error/ApiError');
class HeroesController {
    async getAllHeroes(req, res){
        try{
            const heroes = await pool.query(`SELECT * FROM heroes`);
            return res.json(heroes.rows)
        }catch (error){
            console.error(error)
        }
    }
    async addHero(req, res, next){
        try{
            const {nickname, real_name, origin, superpowers, phrase, images} = req.body
            const id = uuidv4()

            if(!nickname || !real_name || !origin || !superpowers || !phrase || !images) {
                return next(ApiError.badRequest('Incorrect data in request'))
            }

            const newHero = await pool.query(`INSERT INTO heroes(id, nickname, real_name, origin, superpowers, phrase, images) VALUES($1,$2,$3,$4,$5,$6,$7)`, [id, nickname, real_name, origin, superpowers, phrase, images]);

            if (!newHero) {
                return next(ApiError.internal('Hero was not created, something went wrong'))
            }

            return res.json(newHero)
        }catch (error){
            console.error(error)
        }
    }

    async editHero(req, res, next){
        try{
            const id = req.params.id;
            if(!id){
                return next(ApiError.badRequest('Incorrect request - missed id'))
            }

            const {nickname, real_name, origin, superpowers, phrase, images} = req.body
            if(!nickname || !real_name || !origin || !superpowers || !phrase || !images) {
                return next(ApiError.badRequest('Incorrect data in request'))
            }

            const updatedHero = await pool.query(`UPDATE heroes SET nickname = $1, real_name  = $2, origin = $3, superpowers = $4, phrase = $5, images = $6 WHERE id = $7;`, [nickname, real_name, origin, superpowers, phrase, images, id]);

            if (!updatedHero) {
                return next(ApiError.internal('Hero was not updated, something went wrong'))
            }
            return res.json(updatedHero)
        }catch (error){
            console.error(error)
        }
    }
    async deleteHero(req, res, next){
        try{
            const id = req.params.id
            if(!id){
                return next(ApiError.badRequest('Incorrect request - missed id'))
            }
            const delHero = await pool.query(`DELETE FROM heroes WHERE id = $1;`, [id]);
            if (!delHero) {
                return next(ApiError.internal('Hero was not deleted, something went wrong'))
            }
            return res.json(delHero)
        }catch (error){
            console.error(error)
        }
    }
}

module.exports = new HeroesController()