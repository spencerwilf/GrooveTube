from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_videos():
    v1 = Video(
        user_id=2, 
        title='Santana - Soul Sacrifice 1969 Woodstock Drum Solo', 
        description='Santana live at Woodstock',
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/4a89eb7585e34d3da13f2ff7eed99257.jpeg', 
        category='Music', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/bf2caf1548614491813c9294c4eddc61.mp4'
    )
    v2 = Video(
        user_id=2, 
        title='The Jimi Hendrix Experience - Voodoo Child (Slight Return) (Live In Maui, 1970)', 
        description="Experience Hendrix announces a brand new collection that couples the new feature length documentary Music, Money, Madness . . . Jimi Hendrix In Maui with the accompanying live performances on both audio and video. The film chronicles the Jimi Hendrix Experience’s storied visit to Maui, and how the band became ensnared with the ill-fated Rainbow Bridge movie and incorporates never before released original footage and new interviews",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/3363d6cfd6094f6ab96eb728744e5eb9.png', 
        category='Music', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/8ab6dce9f0354b3aa4863ea16c54e137.mp4'
    )
    v3 = Video(
        user_id=3, 
        title='Queen Live Aid 1985 - EEEEEOOOOOO', 
        description='EEEEEOOOOOO',
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/379f9ace4cf94a03919f4163df21069a.jpeg', 
        category='Music', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/adc949d858ce4d8f99ab574cccc50f3a.mp4'
    )
    v4 = Video(
        user_id=4, 
        title='Queen - Somebody To Love Intro - HD Live - 1981 Montreal', 
        description='Live from Montreal',
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/39836c7717e8453b8d9f53c00c45f919.png', 
        category='Music', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/27cb668a44ad416e95874d5c15a1f270.mp4'
    )
    v5 = Video(
        user_id=5, 
        title='Michael Jackson debuts the moonwalk', 
        description="All hail the king",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/040384b5eff147f2a644713eaee09a68.png', 
        category='Music', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/a8887d2d27ec4a30bd6c82cd0214ec82.mp4'
    )
    v6 = Video(
        user_id=6, 
        title='Zohan - Disco Disco Good Good (HD)', 
        description="You don't mess with the Zohan",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/5eb6f6e1cae341958dc0971a3db9f46f.png', 
        category='Movies', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/4e56ff4585d047d286a316f98287e49a.mp4'
    )
    v7 = Video(
        user_id=1, 
        title='Saturday Night Fever (Opening Credits)', 
        description="This man is smooth",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/05e5d2e88dc5464fa47bbb8716b9792c.png', 
        category='Movies', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/094e6d8be26844d79d8076880d47df59.mp4'
    )
    v8 = Video(
        user_id=2, 
        title="Kid dancing at club can't be bothered. 1997.", 
        description="Get down!",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/316d6fc84e844edab7808e0aa816cb78.png', 
        category='Funny', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/b4655b19b559465c87f9059c0f64a0eb.mp4'
    )
    v9 = Video(
        user_id=3, 
        title="NAPOLEON DYNAMITE Dance Scene.", 
        description="How much do you want to bet I can throw this football over them mountains?",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/f8f16e7b32dc4e17a92f394771a96752.png', 
        category='Movies', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/53557d06cd1345049aef55fc0d47cfc7.mp4'
    )
    v10 = Video(
        user_id=4, 
        title="Pulp Fiction - Dance Scene (HQ)", 
        description="I do believe Marsellus Wallace, my husband, your boss, told you to take ME out and do WHATEVER I WANTED. Now I wanna dance, I wanna win. I want that trophy, so dance good.",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/356b45882ef74d88b598717159669ed5.jpg', 
        category='Movies', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/93c0ef537aab46a0a63f95fb915ac1d5.mp4'
    )
    v11 = Video(
        user_id=5, 
        title="Airplane! | 'Staying Alive'", 
        description="Ladies and gentlemen, this is your stewardess speaking... We regret any inconvenience the sudden cabin movement might have caused, this is due to periodic air pockets we encountered, there's no reason to become alarmed, and we hope you enjoy the rest of your flight... By the way, is there anyone on board who knows how to fly a plane?",
        thumbnail='https://new-groovetube-bucket.s3.amazonaws.com/879eb944e505463b8f0c7d07f745a281.png', 
        category='Movies', 
        url='https://new-groovetube-bucket.s3.amazonaws.com/07661bc08f1a419f97e862daf01e047c.mp4'
    )



    db.session.add(v1)
    db.session.add(v2)
    db.session.add(v3)
    db.session.add(v4)
    db.session.add(v5)
    db.session.add(v6)
    db.session.add(v7)
    db.session.add(v8)
    db.session.add(v9)
    db.session.add(v10)
    db.session.add(v11)
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