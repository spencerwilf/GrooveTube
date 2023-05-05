from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Video, Comment, db, UserLike
from ..forms.comment_form import CommentForm
from .aws_helpers import upload_vid_to_AWS, allowed_file, upload_thumb_to_AWS, get_unique_filename, delete_file_from_AWS
from app.forms import VideoForm

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
    
    video.views += 1

    db.session.commit()

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

@video_routes.route('', methods=['POST'])
@login_required
def upload_video():

    if 'video' not in request.files:
        return {'error': 'video file required'}, 401


    if 'thumbnail' not in request.files:
        return {'error': 'thumbnail image required'}, 401

    vid = request.files['video']
    thumbnail = request.files['thumbnail']


    if not allowed_file(vid.filename) or not allowed_file(thumbnail.filename):
        return {"error": "file type not permitted"}, 403

    vid.filename = get_unique_filename(vid.filename)
    thumbnail.filename = get_unique_filename(thumbnail.filename)

    upload_vid = upload_vid_to_AWS(vid)
    upload_thumbnail = upload_thumb_to_AWS(thumbnail)


    if 'url' not in upload_vid or 'url' not in upload_thumbnail:
        return {"error": "failed to upload"}

    url = upload_vid['url']
    thumb_url = upload_thumbnail['url']

    data = request.form

    new_video = Video(
        url = url,
        thumbnail = thumb_url,
        user_id = current_user.id,
        title = data['title'],
        description = data['description'],
        category = data['category']
    )

    db.session.add(new_video)
    db.session.commit()
    return new_video.to_dict()


## Getting a video's likes
@video_routes.route('/<int:video_id>/likes')
def get_video_likes(video_id):
    video = Video.query.get(video_id)
    return [like.to_dict() for like in video.video_likes]





## Adding a like to a video
@video_routes.route('/<int:video_id>/likes', methods=['POST'])
@login_required
def like_video(video_id):
    video = Video.query.get(video_id)
    user = User.query.get(current_user.id)

    current_user_video_likes = [like.video_id for like in user.likes]

    if not video:
        return {"message": "video not found"}, 404
    

    
    if video_id in current_user_video_likes:
        return {"message": "user has already liked video"}, 401
    
    

    new_like = UserLike(
        user_id = current_user.id,
        video_id=video_id
    )

    

    video.likes += 1

    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()
    

    
## Unliking a video
@video_routes.route('/<int:video_id>/likes', methods=['DELETE'])
@login_required
def unlike_video(video_id):
    video = Video.query.get(video_id)
    user = User.query.get(current_user.id)


    if not video:
        return {"message": "video not found"}, 404
    

    for like in video.video_likes:
        if like.user_id == current_user.id:
            db.session.delete(like)
            # video.video_likes.remove(like)
            video.likes -= 1
            db.session.commit()
            return {"message": "successfully unliked"}
    
        
    return {"message": "no like found"}



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

    # video_delete = delete_file_from_AWS(video.url)

    # if video_delete:
    db.session.delete(video)
    db.session.commit()
    return {"message": "video successfully deleted"}

    return {"message": "deletion error"}



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



@video_routes.route('/search')
def search_videos():
    query = request.args.get('query')
    if query:
        videos = Video.query.filter(Video.title.ilike(f"%{query}%")).all()
    else:
        return None
    return [video.to_dict() for video in videos]