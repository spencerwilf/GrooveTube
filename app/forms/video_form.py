from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

class VideoForm(FlaskForm):
    title = StringField('Title')
    description = StringField('Title')
    thumbnail = StringField('Title')
    title = StringField('Title')
