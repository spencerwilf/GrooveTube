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
    v4 = Video(
        user_id=3, 
        title='Travis Scott falls in autotune', 
        description='Goodnight sweet prince',
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/f8f1c4416a6f4c2396a700e03dfee572.png', 
        category='Music', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/4629cb1e408f43c28b833622fe30a2b3.mp4'
    )
    v5 = Video(
        user_id=3, 
        title='Kawhi Leonard being the funniest human alive', 
        description="He's a fun guy",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/54cd89075a76415b823972cd7cd36bd0.png', 
        category='Sports', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/e01087e88e3b4a64abd1a1607b99b007.mp4'
    )
    v6 = Video(
        user_id=3, 
        title='McLovin?!?', 
        description="What're you trying to be? an Irish r&b singer?",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/3053ec4145ea44d78549bbe25f3baf00.png', 
        category='Movies', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/da5842aff39049ea821f7968666a53f4.mp4'
    )
    v7 = Video(
        user_id=3, 
        title='Drake sees a dog at the club', 
        description="nice description",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/07b8cc44d62d4a369fbf3eddbce79fe5.png', 
        category='Music', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/b2cc3a8e49f24aeb9994fc1409158995.mp4'
    )
    v8 = Video(
        user_id=3, 
        title="American Psycho: Let's see Paul Allen's card", 
        description="oh my god, it even has a watermark",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/03eccdd2b9d044c48fa165d5d58c8e7b.png', 
        category='Movies', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/f27faf9534394d93b2d7ccd354aa1ed3.mp4'
    )



    db.session.add(v1)
    db.session.add(v2)
    db.session.add(v3)
    db.session.add(v4)
    db.session.add(v5)
    db.session.add(v6)
    db.session.add(v7)
    db.session.add(v8)
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