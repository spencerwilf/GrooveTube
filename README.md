<div align="center">
# Welcome to GrooveTube
### A full stack video sharing applicaition inspired by YouTube

<img src="https://github.com/spencerwilf/GrooveTube/assets/98922382/b66603b8-69f6-449e-8e5a-36af620112fb" alt="your-image-description" width="500" height="500">


### What's GrooveTube?
GrooveTube is a video sharing application that answers the question that we've all inevitably had at some point: "What if YouTube was groovier?" With this searing question in mind I built GrooveTube, an application where users can watch and like videos, comment on them, and even upload their own. Check out GrooveTube at the link below.

[Access the live site here](https://groovetube.onrender.com/)

---

### Technologies Utilized
<div>
   <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" title="python" alt="python" width="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" title="css" alt="css" width="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp; 
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/flask/flask-original-wordmark.svg" title="flask" **alt="flask" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="postgres" **alt="postgres" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original-wordmark.svg" title="sqlalchemy" **alt="sqlalchemy" width="40" height="40"/>
</div>

---
&nbsp;

# Overview

### Splash Page


![Screen_Recording_2023-05-10_at_2_31_15_PM_AdobeExpress](https://github.com/spencerwilf/GrooveTube/assets/98922382/0aedc0da-8525-4b3d-984d-653e5c9445e0)
&nbsp;

### Home Page

<img width="1717" alt="Screenshot 2023-05-10 at 3 04 30 PM" src="https://github.com/spencerwilf/GrooveTube/assets/98922382/15265af2-6685-4f4c-acd9-edb7182b2568">
&nbsp;

### Video Page

![Screen_Recording_2023-05-10_at_3_08_29_PM_AdobeExpress](https://github.com/spencerwilf/GrooveTube/assets/98922382/ae5fd139-6138-4f8b-8ebd-a4cf1037fea5)
&nbsp;

### Upload Video Panel #1


<img width="1719" alt="Screenshot 2023-05-10 at 3 33 40 PM" src="https://github.com/spencerwilf/GrooveTube/assets/98922382/d9f8add8-aece-490c-9af6-8dcbe733be19">
&nbsp;

### Upload Video Panel #2

<img width="1724" alt="Screenshot 2023-05-10 at 3 57 49 PM" src="https://github.com/spencerwilf/GrooveTube/assets/98922382/fb6666bd-5099-44f5-89db-90464cc8faa8">

&nbsp;
### User Video Page

<img width="1715" alt="Screenshot 2023-05-10 at 3 58 46 PM" src="https://github.com/spencerwilf/GrooveTube/assets/98922382/915b4376-6f2f-4374-a03c-784c4551b230">

&nbsp;
### Search

<img width="592" alt="Screenshot 2023-05-10 at 4 20 42 PM" src="https://github.com/spencerwilf/GrooveTube/assets/98922382/888b28dc-bfab-49af-995b-4e266d50466e">

---

## Features

### Videos
* Watch videos
* Upload videos
* Delete videos
* Edit the name, category or description of a video

### Comments
* Leave a comment
* Edit a comment
* Delete a comment
* View the commens of others

### Likes
* View your liked videos
* Like a video
* Unlike a video

### Search
* Search for video titles
* Have videos dynamically recommended based on the present contents of the search bar

### AWS
* Upload a video and its associated thumbnail
* Delete a video and its associated thmbnail
* Set a profile picture


## Future Features
* Playlists
* Subscriptions
* Sorting videos by category
---

## How to run GrooveTube locally

1.) Clone the main branch on this repository

2. Install dependencies

```python
pipenv install -r requirements.txt
```

3.) Create a .env file. Ensure that that a database connection variable is present.
```python
DATABASE_URL=sqlite:///dev.db
```

4.) Enter your shell, migrate the database, seed the database, and run the Flask app..
```python
pipenv shell
flask db upgrade
flask db seed all
flask run
```

5.) To run the React App in development, check out the README inside the react-app directory.
   
</div>
