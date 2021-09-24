export default function addSocket(socket){
    return {
        type: 'user/socketAdded',
        payload:{ socket }
    }
}