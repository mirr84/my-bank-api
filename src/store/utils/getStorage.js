import {getSessionStorage} from "./getSessionStorage";

export const getStorage = () => (
    {
        storage: sessionStorage,
        getInitStorage: getSessionStorage
    }
)
