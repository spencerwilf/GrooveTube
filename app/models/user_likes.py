from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint

class UserLike(db.Model):
    __tablename__ = 'user_likes'
    __table_args__ = (
        UniqueConstraint('user_id', 'video_id'),
    )

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')))
    UniqueConstraint('user_id', 'video_id')

    user = db.relationship('User', back_populates='likes')
    video = db.relationship('Video', back_populates='video_likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id
        }
    
    def to_dict_video(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'video': self.video.to_dict()
        }