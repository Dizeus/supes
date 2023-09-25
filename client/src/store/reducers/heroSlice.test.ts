import heroReducer, {
    addHero,
    deleteHero,
    heroSlice,
    setCurrentHero,
    setHeroes,
    setModal, setPage, setTotalPages,
    updateHero
} from "./heroSlice";

const heroToAdd = {
        "id": "b4ad176c-c279-4498-a638-30ddb0baf6b4",
        "nickname": "'superman'",
        "real_name": "\"Clark Kent'",
        "origin": "'Cripton'",
        "superpowers": "'strength'",
        "phrase": "'Look in the sky'",
        "images": [
            "D:\\web\\pet-projects\\supes\\server\\static\\e7d9f1b3-7098-4069-9ea1-398a4e005b9d.jpg",
            "D:\\web\\pet-projects\\supes\\server\\static\\58e1992e-c678-4e4c-8665-1e237b37eb59.jpg"
        ]
    }
const heroToUpdate =  {
    id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
    nickname: "Batman",
    real_name: "Bruce Wayne",
    origin: "Gotham - Babylon of criminal world",
    phrase: "I am Vengeance, I am nocturnal animals",
    superpowers: "Money, ninja",
    images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
}
const updatedHeroes = [
    {
        id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
        nickname: "Batman",
        real_name: "Bruce Wayne",
        origin: "Gotham - Babylon of criminal world",
        phrase: "I am Vengeance, I am nocturnal animals",
        superpowers: "Money, ninja",
        images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
    }
]

const initialState = {
     heroes: [{
         id: "b4ad176c-c279-4498-a638-30ddb0baf6b4",
         nickname: "Batman",
         real_name: "Bruce Wayne",
         origin: "Gotham - Babylon of criminal world",
         phrase: "I am Vengeance",
         superpowers: "Money, ninja",
         images: ['exampleImages/batman1.jpg', 'exampleImages/batman2.jpg']
     }],
     modal: 'none',
     currentHero: null,
     totalPages: 0,
     page: 1,
 }
describe('Testing Reducer', () => {

    test('Set heroes', () => {
        expect((heroReducer(initialState, setHeroes([heroToAdd]))).heroes.length).toBe(2)
    })

    test('Add hero', () => {
        expect((heroReducer(initialState, addHero(heroToAdd))).heroes.length).toBe(2)
    })

    test('Update hero', () => {
        expect(heroReducer(initialState, updateHero(heroToUpdate)).heroes).toEqual(updatedHeroes)
    })

    test('Delete hero', () => {
        expect(heroReducer(initialState, deleteHero( "b4ad176c-c279-4498-a638-30ddb0baf6b4")).heroes.length).toBe(0)
    })
    test('Set modal', () => {
        expect(heroReducer(initialState, setModal( "add")).modal).toBe('add')
        expect(heroReducer(initialState, setModal( "edit")).modal).toBe('edit')
        expect(heroReducer(initialState, setModal( "none")).modal).toBe('none')
    })
    test('Set current hero', () => {
        expect(heroReducer(initialState, setCurrentHero( heroToAdd)).currentHero).toEqual(heroToAdd)
    })
    test('Set total pages', () => {
        expect(heroReducer(initialState, setTotalPages( 10)).totalPages).toEqual(10)
    })
    test('Set page', () => {
        expect(heroReducer(initialState, setPage(3)).page).toEqual(3)
    })
})