export default function addError(error){
    return {
        type: 'login/errorAdded',
        payload:{ error }
    }
}