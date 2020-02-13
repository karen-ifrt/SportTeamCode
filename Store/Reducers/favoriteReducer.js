const initialState = {favoritesTeam: [] }


function toggleFavorite(state = initialState, action) {
    let nextState
    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteTeamIndex = state.favoritesTeam.findIndex(item => item.idTeam === action.value.idTeam)
            if(favoriteTeamIndex !== -1) {
                //Suppression
                nextState = {
                    ...state,
                    favoritesTeam: state.favoritesTeam.filter( (item, index) => index !== favoriteTeamIndex)
                }
            }
            else {
                //Ajouter la team
                nextState = {
                    ...state,
                    favoritesTeam: [ ...state.favoritesTeam, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite