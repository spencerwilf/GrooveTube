from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Jimi', last_name= 'Hendrix', username='jimihendrix', email='demo@aa.io', password='password', profile_picture='https://i.scdn.co/image/ab6761610000e5eb31f6ab67e6025de876475814')
    marnie = User(
        first_name='Freddie', last_name= 'Mercury', username='freddiemercury', email='freddie@aa.io', password='password', profile_picture='https://m.blog.hu/ol/olvass-erdekessegeket/image/freddie_mercury_04.jpg')
    bobbie = User(
        first_name='Diana', last_name= 'Ross', username='dross123', email='diana@aa.io', password='password', profile_picture='https://media.vogue.co.uk/photos/60618ee2b068b5e40328cbb9/4:3/w_2428,h_1821,c_limit/00-promo-image-diana-ross-beauty-hits.jpg')
    jon = User(
        first_name='John', last_name= 'Lennon', username='jlen', email='john@aa.io', password='password', profile_picture='https://www.billboard.com/wp-content/uploads/2020/06/John-Lennon-1973-nyc-a-billboard-1548-1591364077.jpg')
    mick = User(
        first_name='Mick', last_name= 'Jagger', username='mjags', email='mick@aa.io', password='password', profile_picture='https://s.wsj.net/public/resources/images/BN-IP443_JAGGER_P_20150526164559.jpg')
    abba = User(
        first_name='ABBA', last_name= 'ABBA', username='abba', email='abba@aa.io', password='password', profile_picture='https://people.com/thmb/vV2HS3sTtOGEKjb0Sety8tjAgIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x299:751x301)/abba-1-7d1381d906e742feab928cca90a9bf7e.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jon)
    db.session.add(mick)
    db.session.add(abba)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
