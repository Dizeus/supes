const pool = require("../db");
const uuid = require('uuid')
const ApiError = require('../error/ApiError');
const path = require("path");
const fs = require('fs');
function saveImages(pathArray, images){
    const filePath = path.resolve(__dirname, '../static');
    (images.length?[...images]:[images]).map(async (image)=>{
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        const fileName = uuid.v4() + '.jpg'
        await image.mv(filePath + '/' + fileName)
        pathArray.push(`/${fileName}`)
    })
    return pathArray
}
class HeroesController {

    async getAllHeroes(req, res){
        try{
            const page = req.params.id
            let offset = page * 5 - 5
            const heroes = await pool.query(`SELECT * FROM heroes ORDER BY heroes.id DESC LIMIT 5 OFFSET $1;`, [offset]);
            const count = await pool.query(` SELECT count(*) FROM heroes;`);
            return res.json({heroes: heroes.rows, rows: count.rows[0].count})
        }catch (error){
            console.error(error)
        }
    }
    async addHero(req, res, next){
        try{
            const id = uuid.v4()
            const {images} = req.files
            const {nickname, real_name, origin, superpowers, phrase} = req.body;

            let pathArray = saveImages([], images)

            if(!nickname || !real_name || !origin || !superpowers || !phrase || !images) {
                return next(ApiError.badRequest('Incorrect data in request'))
            }

            await pool.query(`INSERT INTO heroes(id, nickname, real_name, origin, superpowers, phrase, images) VALUES($1,$2,$3,$4,$5,$6,$7)`, [id, nickname, real_name, origin, superpowers, phrase, pathArray]);

            const newHero = await pool.query(`SELECT * FROM heroes WHERE id = $1;`, [id]);

            if (!newHero) {
                return next(ApiError.internal('Hero was not created, something went wrong'))
            }
            return res.json(newHero.rows[0])
        }catch (error){
            console.error(error)
        }
    }

    async editHero(req, res, next){
        try{
            const images = req.files?.images
            const {id, nickname, real_name, origin, superpowers, phrase, old_images} = req.body;

            let pathArray = JSON.parse(old_images)
            if(images){
                pathArray = saveImages(pathArray, images)
            }
            if(!nickname || !real_name || !origin || !superpowers || !phrase) {
                return next(ApiError.badRequest('Incorrect data in request'))
            }

            await pool.query(`UPDATE heroes SET nickname = $1, real_name  = $2, origin = $3, superpowers = $4, phrase = $5, images = $6 WHERE id = $7;`, [nickname, real_name, origin, superpowers, phrase, pathArray, id]);

            const newHero = await pool.query(`SELECT * FROM heroes WHERE id = $1;`, [id]);

            return res.json(newHero.rows[0])
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
            await pool.query(`DELETE FROM heroes WHERE id = $1;`, [id]);

            return res.json({message: "Successful deleted"})
        }catch (error){
            console.error(error)
        }
    }
}

module.exports = new HeroesController()