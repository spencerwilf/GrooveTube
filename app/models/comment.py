from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), nullable=False)
    content = db.Column(db.String(250), nullable=False)
    # likes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    user = db.relationship('User', back_populates='comments')
    video = db.relationship('Video', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'content': self.content,
            'user': self.user.to_dict(),
            'created_at': self.created_at
        }