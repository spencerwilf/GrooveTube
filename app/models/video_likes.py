from .db import db, environment, SCHEMA, add_prefix_for_prod

class VideoLike(db.Model):
    __tablename__ = 'video_likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users')))
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos')))

    user = db.relationship('User', back_populates='likes')