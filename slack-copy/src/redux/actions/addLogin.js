export default function addLogin(email, password) {
    return {
        type: 'login/loginAdded',
        payload:{ email, password}
    }
}