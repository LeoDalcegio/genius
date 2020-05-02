const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const NotAnsweredQuestionSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true
    },
    questionKeyWords: [String]
},{
    timestamps: true
});

NotAnsweredQuestionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('NotAnsweredQuestion',NotAnsweredQuestionSchema)
