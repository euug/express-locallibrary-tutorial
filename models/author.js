var mongoose = require('mongoose');
const {
  DateTime
} = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date, default: ''},
    date_of_death: {type: Date, default: ''},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's date of death
AuthorSchema
.virtual('death_date')
.get(function () {
  if (this.date_of_death == null){
    return '';
  }
  return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
});

// Virtual for author's date of birth
AuthorSchema
.virtual('birth_date')
.get(function () {
  if (this.date_of_birth == null){
    return '';
  }
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);