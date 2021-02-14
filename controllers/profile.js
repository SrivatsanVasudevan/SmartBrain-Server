const handleProfileGet = (req,res,db) =>{
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json('error in getting the profile');
        }
    })
    .catch(err => res.status(400).json('unknown user'));
}

module.exports = {
    handleProfileGet: handleProfileGet
}