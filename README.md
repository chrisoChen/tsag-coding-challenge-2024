# TSAG Coding Challenge: Movie Awards Web App
Coding challenge completed per the request of TSAG. Features movie search, saving favorite movies, and viewing and managing favorite movies.

## Technical Specs
FrontEnd
1. React.js (Vanilla)
2. Redux
3. Redux-Saga
4. TailwindCSS
5. Flowbite

Backend
1. Django
2. Django REST Framework
3. SQLite


## Bonus Features Implemented
Enhanced UI
- Added mobile responsiveness
- Displayed specific fields (poster image for movies)
- Added loading spinner when searching movies

Enhanced UX
- Added toast notification / alerts
- Made saved movies persist even after closing the browser using cookies
- Added tooltips when hovering over disabled buttons
- Added validation and error messages

# Installation Instruction
1. [Ensure Node.js is installed first](https://nodejs.org/en).

2. In the root of the project in a terminal window, use `venv` to create a virtual environement for the Django backend and start the virtual environment (assuming the project is run on Windows 10 in PowerShell terminals).
```
python -m venv c:\path\to\myenv
c:\path\to\myenv\Scripts\Activate.ps1
```

3. Install the dependcies defined in `requirements.txt`.
```
cd tsag_django
pip install -r /path/to/requirements.txt
```

4.  Run Django migrations to ensure the database is setup. Get the Django Server running.
```
python manage.py migrate
python manage.py runserver
```

5. In a separate terminal and in the root of the project, install the dependencies for the React client.

```
cd tsag-react
npm install
```

6. Start the React client.
```
npm start
```
7. Open any browser window and navigate to `http://localhost:3000/`. The url will redirect to `http://localhost:3000/search` automatically.
