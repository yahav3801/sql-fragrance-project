module.exports = {
    getCompaniesList: (callback)=>{
        let querySQL = 'SELECT name FROM companies';

        db.query(querySQL,(err,result)=>{
            if (err) {
                console.error(err);
                callback(err,[]);
                return;
            }
            
            callback(err,result);

        })
    }
}