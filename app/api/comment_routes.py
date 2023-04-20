from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Comment


comment_routes = Blueprint('comments', __name__)