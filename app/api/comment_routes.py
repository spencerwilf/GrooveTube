from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, User, db


comment_routes = Blueprint('comments', __name__)

## Most comment routes will be housed in videos
## TODO: Add likes to comments

## Get user's comments
@comment_routes.route('')
@login_required
def get_comments():
    """
    Get all of a user's comments
    """
    comments = Comment.query.filter(Comment.user_id == current_user.id)
    return [comment.to_dict() for comment in comments] 


## Get a comment
@comment_routes.route('/<int:comment_id>')
@login_required
def get_one_comment(comment_id):
    """
    Get a comment
    """
    return Comment.query.get(comment_id).to_dict()


## Editing a current user's comment
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    """
    Edit the current user's comment
    """
    comment = Comment.query.get(comment_id)

    if not comment:
        return {"message": "comment not found"}, 404

    if comment.user_id != current_user.id:
        return {"message": 'unauthorized'}, 401

    edit = request.json
    comment.content = edit['content']
    db.session.commit()

    return comment.to_dict()



## Deleting a current user's comment
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    """
    Delete the current user's comment
    """
    comment = Comment.query.get(comment_id)

    if not comment:
        return {"message": "comment not found"}, 404

    if comment.user_id != current_user.id:
        return {"message": 'unauthorized'}, 401

    db.session.delete(comment)
    db.session.commit()

    return {"message": "comment successfully deleted"}