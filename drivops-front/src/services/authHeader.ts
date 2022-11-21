export default function authHeader() {
    if (localStorage.getItem('access_token')) {
        return {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        };
    } else {
        return {};
    }
}
