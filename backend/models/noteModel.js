//Model is basically a schema
//it is what we want for notes
const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({ //this is taking in an object of fields
    //note that each ticket is connect to a user 
    //This means that there is a relationship between note and user 
    user: {
        type: mongoose.Schema.Types.ObjectId,  //this will be used to relate the field to the users objectId
        required: true,
        ref: 'User', //need to have a ref here to know which collection it is linked to for the Object Id
    }, 
    ticket: {
        type: mongoose.Schema.Types.ObjectId,  //this will be used to relate the field to the users objectId
        required: true,
        ref: 'Ticket', //need to have a ref here to know which collection it is linked to for the Object Id
    }, 
    text: {
        type: String, 
        required: [true, 'Please add some text']
    }, 
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String, 
    }
}, 
{
    timestamps: true,
}
)

//        this is passing in the name 'Note' and the noteSchema object
module.exports = mongoose.model('Note', noteSchema) //this is used in the controller.js file