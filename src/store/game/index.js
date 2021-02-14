export default {
    state: {
        lastGame: JSON.parse(localStorage.getItem('lastGame')) ||
            {
                score: {x: 0, o: 0},
                move: 0,
                mark: 'x',
                board: {
                    1: "", 2: "", 3: "",
                    4: "", 5: "", 6: "",
                    7: "", 8: "", 9: "",
                }
            }
    },
    mutations: {
        saveGameState(state, payload) {
            state.lastGame = payload;
            localStorage.setItem('lastGame', JSON.stringify(payload))
        }
    },
    actions: {

    },
    getters: {
        loadGame: s => s.lastGame
    },
}