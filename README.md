# AceYourCV

AceYourCV is a free resume builder prototype with a template gallery, live preview, design controls, and browser-based PDF export.

## Run locally

Requires Python 3. Run:

```powershell
python dev.py
```

The development server opens at `http://127.0.0.1:8000`. Press `Ctrl+C` in the terminal to stop it.

## Project layout

- `frontend/index.html` is the app entry page.
- `frontend/css/` contains the interface styles.
- `frontend/js/` contains the resume builder interactions.
- `backend/server.py` contains the Python development server and `/api/health` endpoint.
- `dev.py` is the local development entry point.

Resume details currently remain in the browser session and are not sent to the backend.
