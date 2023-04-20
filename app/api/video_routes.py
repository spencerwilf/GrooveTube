from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Video

user_routes = Blueprint('videos', __name__)