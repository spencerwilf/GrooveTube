from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Video, Comment, db
from ..forms.comment_form import CommentForm

video_routes = Blueprint('videos', __name__)

##TODO: Create a video, add likes to video

## Get all videos in the database
@video_routes.route('')
def get_videos():
    """
    Get all videos in the database
    """
    videos = Video.query.all()
    return [video.to_dict() for video in videos] 



## Get one video in the database
@video_routes.route('/<int:video_id>')
def get_one_video(video_id):
    """
    Get one videos in the database
    """
    video = Video.query.get(video_id)
    
    if not video:
        return {"message": "video not found"}, 404

    return video.to_dict()



## Get current user's videos
@video_routes.route('/current')
@login_required
def get_user_videos():
    """
    Get current user's videos
    """
    videos = Video.query.filter(Video.user_id == current_user.id).all()
    return [video.to_dict() for video in videos]



## Upload a video (AWS-- DO LATER)




## Delete a video
@video_routes.route('/<int:video_id>', methods=['DELETE'])
@login_required
def delete_video(video_id):
    """video
    Delete a video
    """
    video = Video.query.get(video_id)

    if not video:
        return {"message": "comment not found"}, 404

    if video.user_id != current_user.id:
        return {"message": 'unauthorized'}, 401

    db.session.delete(video)
    db.session.commit()

    return {"message": "video successfully deleted"}



## Editing the current user's video
@video_routes.route('/<int:video_id>', methods=['PUT'])
@login_required
def edit_video(video_id):
    """
    Edit the current user's video
    """
    video = Video.query.get(video_id)

    if not video:
        return {"message": "video not found"}, 404

    if video.user_id != current_user.id:
        return {"message": 'unauthorized'}, 401

    edit = request.json

    if 'title' in edit:
        video.title = edit['title']
    if 'description' in edit:
        video.description = edit['description']
    if 'thumbnail' in edit:
        video.thumbnail = edit['thumbnail']
    if 'category' in edit:
        video.category = edit['category']
    
    db.session.commit()

    return video.to_dict()


## Getting all the comments on a video
@video_routes.route('/<int:video_id>/comments')
def get_video_comments(video_id):

    comments = Comment.query.filter(video_id == Comment.video_id)

    if not comments:
        return {"message": "video not found"}, 404

    return [comment.to_dict() for comment in comments]

    



## Adding a comment to a video
@video_routes.route('/<int:video_id>/comments', methods=['POST'])
@login_required
def add_comment_to_video(video_id):
    """
    Leaving a comment on a video
    """
    video = Video.query.get(video_id)

    if not video:
        return {"message": "video not found"}, 404

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newComment = Comment(
            user_id = current_user.id,
            video_id = video.id,
            content = form.data['content']
        )
        db.session.add(newComment)
        db.session.commit()
        return newComment.to_dict()
    return {"message": "bad data"}, 404


    