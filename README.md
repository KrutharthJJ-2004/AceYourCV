# AceYourCV

AceYourCV is a free resume builder prototype with a template gallery, live preview, design controls, and browser-based PDF export.

## Run locally

Requires Python 3. Run:

```powershell
python New.py
```

The development server opens at `http://127.0.0.1:8000`. Press `Ctrl+C` in the terminal to stop it.

## Project layout

- `frontend/` contains the static HTML, CSS, and JavaScript interface.
- `backend/` contains the Python development server and `/api/health` endpoint.
- `New.py` is the convenient development entry point.

Resume details currently remain in the browser session and are not sent to the backend.
