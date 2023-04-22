from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    thumbnail = db.Column(db.String(250), nullable=False)
    category = db.Column(db.String(100))
    url = db.Column(db.String(250))
    likes = db.Column(db.Integer, default=0)
    views = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='videos')
    comments = db.relationship('Comment', back_populates='video', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'thumbnail': self.thumbnail,
            'category': self.category,
            'url': self.url,
            'likes': self.likes,
            'views': self.views,
            'created_at': self.created_at,
            'user': self.user.to_dict()
        }

    def to_dict_comments(self):
            return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'thumbnail': self.thumbnail,
            'category': self.category,
            'url': self.url,
            'likes': self.likes,
            'views': self.views,
            'created_at': self.created_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }
