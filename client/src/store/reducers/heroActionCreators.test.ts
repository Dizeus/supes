import heroReducer, {deleteHero} from "./heroSlice";
import {removeHero} from "./heroActionCreators";
import {api} from "../../api/api";
import axios from 'axios';

jest.mock('axios')

const resultDelete = {data: {message: "Successful deleted"}, status: 200}

describe('Testing Thunks', () => {
    test('Test Delete', async () => {
        (axios.delete as jest.Mock).mockReturnValue(resultDelete);
        const thunk = removeHero("b4ad176c30ddb0baf6b4")
        const dispatchMock = jest.fn()
        await thunk(dispatchMock)
        expect(axios.delete).toBeCalledTimes(1)
    })

})




