module.exports = {
    setSData(){
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    getSData(){
        console.log(789)
        return 789
        // return JSON.parse(sessionStorage.getItem(key));
    }
}