import http from './httpService';

const tokenKey = "token";

function register({email, password, username}) {
    return new Promise(async (resolve) => {
        const response = await http.auth.createUserWithEmailAndPassword(email, password);
        const uid = response.user.uid;
        await http.post("users", uid, {
            username,
            favouriteList: null,
        });
        localStorage.setItem(tokenKey, uid);
        resolve();
    });
}

function login({email, password}) {
    return new Promise(async (resolve) => {
        const response = await http.auth.signInWithEmailAndPassword(email, password);
        const uid = response.user.uid;
        localStorage.setItem(tokenKey, uid);
        resolve();
    });
}

function logOut() {
    localStorage.removeItem(tokenKey);
    window.location = '/';
}

function getCurrentUser() {
    return new Promise(async (resolve) => {
        const uid = getToken();
        if (uid) {
            const user = await http.get(`users/${uid}`);
            user.favouriteList = user.favouriteList || [];
            return resolve(user);
        }
        resolve(null);
    });
}

function getToken() {
    return localStorage.getItem(tokenKey);
}

export default {
    register,
    login,
    logOut,
    getCurrentUser,
    getToken
};