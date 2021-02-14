const handleRegister = (req,res,db,bcrypt) => {
    const {email,password,name} = req.body;
    const hash = bcrypt.hashSync(password);
    if(email && password && name){
        console.log(email,password,name);
        db.transaction(trx => {
            trx.insert({
                hash:hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user =>{
                    
                    if(user.length){
                        res.json(user[0]);
                    }
                    else{
                        res.status(400).json('enter registration details');
                    }
                })
                
                })
                .then(trx.commit)
                .catch(trx.rollback);
            })
        .catch(err => res.status(400).json('unable to register'))
    }
    else{
        res.status(400).json('missing credentials');
    }
    
}

module.exports = {
    handleRegister: handleRegister
}