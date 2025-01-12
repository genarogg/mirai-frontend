// searchReducer.ts

export type State = {
    query: string;
    hasResults: boolean;
    recentSearches: { title: string; url: string }[];
};

export type Action =
    | { type: "SET_QUERY"; payload: string }
    | { type: "SET_HAS_RESULTS"; payload: boolean }
    | { type: "SET_RECENT_SEARCHES"; payload: { title: string; url: string }[] }
    | { type: "ADD_RECENT_SEARCH"; payload: { title: string; url: string } };

export const initialState: State = {
    query: "",
    hasResults: true,
    recentSearches: [],
};

export const searchReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_QUERY":
            return { ...state, query: action.payload, hasResults: action.payload.trim() !== "" };
        case "SET_HAS_RESULTS":
            return { ...state, hasResults: action.payload };
        case "SET_RECENT_SEARCHES":
            return { ...state, recentSearches: action.payload };
        case "ADD_RECENT_SEARCH":
            return { ...state, recentSearches: [...state.recentSearches, action.payload] };
        default:
            throw new Error("Unhandled action type");
    }
};
