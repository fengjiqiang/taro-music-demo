import { UPDATEUSER, CLEARUSER } from '@/constants/index'

export default function person(state = {}, action) {
    switch (action.type) {
        case UPDATEUSER:
            return {
                ...action.data
            }
        case CLEARUSER:
            return {}
        default:
            return state
    }
}
