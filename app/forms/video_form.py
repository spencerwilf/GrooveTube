from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class VideoForm(FlaskForm):
    title = StringField('Title')
    url = FileField('url', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField('Description')
    thumbnail = FileField('thumbnail', validators=[FileRequired(), FileAllowed(['png', 'jpeg', 'jpg'])])
    category = StringField('Category')