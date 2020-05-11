import { BehaviorSubject } from 'rxjs';



const currentTokenSubject = new BehaviorSubject(localStorage.getItem('token'));


export const AuthService ={
    get currentHeaderValue(){
        const token = localStorage.getItem("token");
        return token?"Bearer "+token:null;
    },
    storeToken,
    logout,
    currentUser :currentTokenSubject.asObservable(),
    get currentUserValue(){return currentTokenSubject.value }
};
function storeToken (token){
    localStorage.setItem("tokenType",token.tokenType);
    localStorage.setItem("token",token.token);
}
function logout(){
    localStorage.clear();
    currentTokenSubject.next(null);
}