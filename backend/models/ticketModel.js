//Model is basically a schema
//it is what we want for tickets
const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({ //this is taking in an object of fields
    //note that each ticket is connect to a user 
    //This means that there is a relationship between ticket and user 
    user: {
        type: mongoose.Schema.Types.ObjectId,  //this will be used to relate the field to the users objectId
        required: true,
        ref: 'User', //need to have a ref here to know which collection it is linked to for the Object Id
    }, 
    product: {
        type: String, 
        required: [true, 'Please select a product'], //return as an array with the first value is true and the message 
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    }, 
    description: {
        type: String, 
        required: [true, 'Please enter a description of the issue']
    }, 
    status: {
        type: String, 
        enum: ['new', 'open', 'closed'],
        default: 'new',
    }
}, 
{
    timestamps: true,
}
)

//        this is passing in the name 'Ticket' and the userSchema object
module.exports = mongoose.model('Ticket', ticketSchema)