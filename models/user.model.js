User.create = async (newUser) => {
    let insert = await pool.query("INSERT INTO user SET ?", newUser);
    if( insert.insertId ) {
        return insert.insertId;
    }
    else {
        return;
    }
};

User.login = async (value) => {
    let row = await pool.query(`SELECT * FROM user WHERE name = ?`, value);
    if( row.length ) {
        return row[0];
    }
    else {
        throw new NotFoundError("User does not exist");
    }
};