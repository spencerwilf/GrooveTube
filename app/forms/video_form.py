from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class VideoForm(FlaskForm):
    title = StringField('Title')
    url = FileField('Video File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    thumbnail = FileField('Image File', validators=[FileRequired(), FileAllowed(['png', 'jpeg', 'jpg'])])
    description = StringField('Description')
    thumbnail = StringField('Thumbnail')
    category = StringField('Category')
