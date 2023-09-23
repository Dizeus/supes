const pool = require("../db");
const uuid = require('uuid')
const ApiError = require('../error/ApiError');
const path = require("path");

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
            const id = uuid.v4()
            const {images} = req.files
            const {nickname, real_name, origin, superpowers, phrase} = req.body;

            let pathArray = []
            if(images.length > 1){
                pathArray = images.map(image=>{
                    const fileName = uuid.v4() + '.jpg'
                    const imagesPath = path.resolve(__dirname, '..', 'static', fileName)
                    image.mv(imagesPath)
                    return fileName
                })
            }else{
                const fileName = uuid.v4() + '.jpg'
                pathArray[0] = fileName
                const imagesPath = path.resolve(__dirname, '..', 'static', fileName)
                images.mv(imagesPath)
            }

            if(!nickname || !real_name || !origin || !superpowers || !phrase || !images) {
                return next(ApiError.badRequest('Incorrect data in request'))
            }

            const newHero = await pool.query(`INSERT INTO heroes(id, nickname, real_name, origin, superpowers, phrase, images) VALUES($1,$2,$3,$4,$5,$6,$7)`, [id, nickname, real_name, origin, superpowers, phrase, pathArray]);

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