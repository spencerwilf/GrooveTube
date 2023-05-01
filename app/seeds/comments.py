from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    c1 = Comment(
        user_id=1, video_id=1, content='The second best act at Woodstock'
    )
    c2 = Comment(
        user_id=2, video_id=2, content='This man can SHRED!!!'
    )
    c3 = Comment(
        user_id=1, video_id=3, content='EEEEEEOOOOO'
    )
    c4 = Comment(
        user_id=2, video_id=3, content='EEEEEEOOOOO'
    )
    c5 = Comment(
        user_id=3, video_id=3, content='EEEEEEOOOOO'
    )
    c6 = Comment(
        user_id=4, video_id=3, content='EEEEEEOOOOO'
    )
    c7 = Comment(
        user_id=5, video_id=3, content='EEEEEEOOOOO'
    )
    c8 = Comment(
        user_id=6, video_id=3, content='EEEEEEOOOOO'
    )
    c9 = Comment(
        user_id=1, video_id=4, content='Can this man sing or what??'
    )
    c10 = Comment(
        user_id=4, video_id=4, content='Wish I had pipes like that'
    )
    c11 = Comment(
        user_id=1, video_id=5, content='MJJJJJJJ'
    )
    c12 = Comment(
        user_id=2, video_id=5, content='Unbelievable. Still remember seeing this live'
    )
    c13 = Comment(
        user_id=4, video_id=5, content='imagine theres no countries'
    )
    c14 = Comment(
        user_id=6, video_id=5, content='Nothing short of iconic!'
    )
    c15 = Comment(
        user_id=1, video_id=6, content='DISCO DISCO GOOD GOOD'
    )
    c16 = Comment(
        user_id=2, video_id=6, content='DISCO DISCO GOOD GOOD'
    )
    c17 = Comment(
        user_id=3, video_id=6, content='DISCO DISCO GOOD GOOD'
    )
    c18 = Comment(
        user_id=4, video_id=6, content='DISCO DISCO GOOD GOOD'
    )
    c19 = Comment(
        user_id=5, video_id=6, content='DISCO DISCO GOOD GOOD'
    )
    c20 = Comment(
        user_id=5, video_id=6, content='DISCO DISCO GOOD GOOD'
    )
    c21 = Comment(
        user_id=4, video_id=7, content='swooning'
    )
    c22 = Comment(
        user_id=5, video_id=7, content='This is my favorite movie!'
    )
    c23 = Comment(
        user_id=5, video_id=7, content='Should call this man Land o Lakes the way hes so smooth'
    )
    c24 = Comment(
        user_id=5, video_id=8, content='bro has moves'
    )
    c25 = Comment(
        user_id=6, video_id=8, content='Me as a kid'
    )
    c26 = Comment(
        user_id=1, video_id=8, content="He's the man!!"
    )
    c27 = Comment(
        user_id=3, video_id=9, content='Does the chicken have large talons?'
    )
    c28 = Comment(
        user_id=4, video_id=9, content='I mean, we chat online for like two hours every day, so I guess you could say things are getting pretty serious.'
    )
    c29 = Comment(
        user_id=5, video_id=9, content="You know, there's, like, a boatload of gangs at this school. This one gang kept wanting me to join because I'm pretty good with a bo staff."
    )


    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)
    db.session.add(c7)
    db.session.add(c8)
    db.session.add(c9)
    db.session.add(c10)
    db.session.add(c11)
    db.session.add(c12)
    db.session.add(c13)
    db.session.add(c14)
    db.session.add(c15)
    db.session.add(c16)
    db.session.add(c17)
    db.session.add(c18)
    db.session.add(c19)
    db.session.add(c20)
    db.session.add(c21)
    db.session.add(c22)
    db.session.add(c23)
    db.session.add(c24)
    db.session.add(c25)
    db.session.add(c26)
    db.session.add(c27)
    db.session.add(c28)
    db.session.add(c29)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()