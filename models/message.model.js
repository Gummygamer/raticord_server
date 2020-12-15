

const Message = function(message) {
    this.sender = message.sender;
    this.receiver = message.receiver;
    this.content = message.content;
	this.time = new Date();
};



Message.list = async (id1,id2) => {
	let row = await pool.query("SELECT * FROM messages WHERE (sender = $1 AND receiver = $2) OR (receiver = $1 AND sender = $2)",[id1,id2]);
	return row;
};


module.exports = Message;
