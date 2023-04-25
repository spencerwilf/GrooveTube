from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_videos():
    v1 = Video(
        user_id=1, 
        title='Chris Paul hits a huge three to cut the lead down to 42', 
        description='This is what basketball is all about',
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/09f530322e9144f9aa7cdd521c7a13df.png', 
        category='Sports', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/06b4b267875c40a686e7771d19d1009e.mp4'
    )
    v2 = Video(
        user_id=2, 
        title='Ronnie Coleman squats 800 SOLID pounds!!!', 
        description='This man is an animal!!!',
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/1972bd98b11641b0b1db9799eed8c5d9.png', 
        category='Fitness', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/17aa0cdab479481abec3397db49ded1a.mp4'
    )
    v3 = Video(
        user_id=3, 
        title='BRUTAL soccer foul caught on film!', 
        description='The horror!!',
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/e3d480f4145a4312b3891c77a7d164b2.png', 
        category='Sports', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/a46b2914ac3e4aafb968853a03893e52.mp4'
    )

    db.session.add(v1)
    db.session.add(v2)
    db.session.add(v3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))
        
    db.session.commit()