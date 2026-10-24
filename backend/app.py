"""Development server and JSON API for AceYourCV.

The frontend lives in ../frontend. This server hosts those static files for
local development and exposes backend routes under /api/.
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import webbrowser


PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_ROOT / "frontend"


class AceYourCVHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(FRONTEND_DIR), **kwargs)

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/api/health":
            payload = json.dumps({"status": "ok", "service": "aceyourcv"}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(payload)
            return
        if self.path.startswith("/api/"):
            self.send_error(404, "API route not found")
            return
        super().do_GET()

    def log_message(self, format, *args):
        print(f"{self.address_string()} - {format % args}")


def main():
    address = ("127.0.0.1", 8000)
    server = ThreadingHTTPServer(address, AceYourCVHandler)
    url = f"http://{address[0]}:{address[1]}"
    print(f"AceYourCV is running at {url} (Ctrl+C to stop)")
    try:
        webbrowser.open(url)
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
