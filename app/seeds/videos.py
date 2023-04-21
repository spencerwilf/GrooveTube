from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_videos():
    v1 = Video(
        user_id=1, 
        title='This Is Video 1', 
        description='Nice description',
        thumbnail='https://static-cse.canva.com/blob/1040254/1600w-wK95f3XNRaM.jpg', 
        category='finance', 
        url='test.net'
    )
    v2 = Video(
        user_id=2, title='This Is Video 2', description='Very nice',
        thumbnail='https://static-cse.canva.com/blob/1040254/1600w-wK95f3XNRaM.jpg', category='sports', url='test.com'
    )
    v3 = Video(
        user_id=3, title='This Is Video 3', description='Cool!',
        thumbnail='https://static-cse.canva.com/blob/1040254/1600w-wK95f3XNRaM.jpg', category='coding', url='test.gov'
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