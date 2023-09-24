 import heroReducer, {addHero, deleteHero, heroSlice, setHeroes, updateHero} from "./heroSlice";
//
// const heroes = [
//     {
//         "id": "b4ad176c-c279-4498-a638-30ddb0baf6b4",
//         "nickname": "'superman'",
//         "real_name": "\"Clark Kent'",
//         "origin": "'Cripton'",
//         "superpowers": "'strength'",
//         "phrase": "'Look in the sky'",
//         "images": [
//             "D:\\web\\pet-projects\\supes\\server\\static\\e7d9f1b3-7098-4069-9ea1-398a4e005b9d.jpg",
//             "D:\\web\\pet-projects\\supes\\server\\static\\58e1992e-c678-4e4c-8665-1e237b37eb59.jpg"
//         ]
//     },
//     {
//         "id": "a1ae6ff8-5802-4d8e-9a77-66dd1be4897f",
//         "nickname": "Batman",
//         "real_name": "Bruce Wayne",
//         "origin": "Gothem",
//         "superpowers": "Money",
//         "phrase": "I am vengenve",
//         "images": [
//             "a0af1d7e-e69d-43e2-ac40-f510c06fd9fd.jpg",
//             "54d8b78d-4091-4525-a653-4872fc7010dc.jpg"
//         ]
//     }
// ]
// const heroToAdd = {
//         "id": "b4ad176c-c279-4498-a638-30ddb0baf6b4",
//         "nickname": "'superman'",
//         "real_name": "\"Clark Kent'",
//         "origin": "'Cripton'",
//         "superpowers": "'strength'",
//         "phrase": "'Look in the sky'",
//         "images": [
//             "D:\\web\\pet-projects\\supes\\server\\static\\e7d9f1b3-7098-4069-9ea1-398a4e005b9d.jpg",
//             "D:\\web\\pet-projects\\supes\\server\\static\\58e1992e-c678-4e4c-8665-1e237b37eb59.jpg"
//         ]
//     }
// const heroToUpdate =  {
//         "id": "b4ad176c-c279-4498-a638-30ddb0baf6b4",
//         "nickname": "superman",
//         "real_name": "Clark Kent",
//         "origin": "'Cripton'",
//         "superpowers": "'strength'",
//         "phrase": "'Look in the sky'",
//         "images": [
//             "D:\\web\\pet-projects\\supes\\server\\static\\e7d9f1b3-7098-4069-9ea1-398a4e005b9d.jpg",
//             "D:\\web\\pet-projects\\supes\\server\\static\\58e1992e-c678-4e4c-8665-1e237b37eb59.jpg"
//         ]
//     }
// const updatedHeroes = [
//     {
//         "id": "a1ae6ff8-5802-4d8e-9a77-66dd1be4897f",
//         "nickname": "Batman",
//         "real_name": "Bruce Wayne",
//         "origin": "Gothem",
//         "superpowers": "Money",
//         "phrase": "I am vengenve",
//         "images": [
//             "a0af1d7e-e69d-43e2-ac40-f510c06fd9fd.jpg",
//             "54d8b78d-4091-4525-a653-4872fc7010dc.jpg"
//         ]
//     },  {
//         "id": "b4ad176c-c279-4498-a638-30ddb0baf6b4",
//         "nickname": "superman",
//         "real_name": "Clark Kent",
//         "origin": "'Cripton'",
//         "superpowers": "'strength'",
//         "phrase": "'Look in the sky'",
//         "images": [
//             "D:\\web\\pet-projects\\supes\\server\\static\\e7d9f1b3-7098-4069-9ea1-398a4e005b9d.jpg",
//             "D:\\web\\pet-projects\\supes\\server\\static\\58e1992e-c678-4e4c-8665-1e237b37eb59.jpg"
//         ]
//     }
// ]
// const deleteHeroes = [
//     {
//         "id": "a1ae6ff8-5802-4d8e-9a77-66dd1be4897f",
//         "nickname": "Batman",
//         "real_name": "Bruce Wayne",
//         "origin": "Gothem",
//         "superpowers": "Money",
//         "phrase": "I am vengenve",
//         "images": [
//             "a0af1d7e-e69d-43e2-ac40-f510c06fd9fd.jpg",
//             "54d8b78d-4091-4525-a653-4872fc7010dc.jpg"
//         ]
//     }
// ]
//
// describe('testing Reducer', () => {
//
//     test('set heroes', () => {
//         expect(heroReducer({heroes: [], modal:'none'}, setHeroes(heroes))).toEqual({heroes: [], modal:'none'})
//     })
//
//     test('add hero', () => {
//         expect(heroReducer({heroes: deleteHeroes, modal:'none'}, addHero(heroToAdd))).toEqual({heroes: [...heroes].reverse(), modal:'none'})
//     })
//
//     test('update hero', () => {
//         expect(heroReducer({heroes: heroes, modal:'none'}, updateHero(heroToUpdate))).toEqual({heroes: updatedHeroes, modal:'none'})
//     })
//
//     test('delete hero', () => {
//         expect(heroReducer({heroes: heroes, modal:'none'}, deleteHero( "b4ad176c-c279-4498-a638-30ddb0baf6b4"))).toEqual({heroes: deleteHeroes, modal:'none'})
//     })
// })