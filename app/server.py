# This simple server emulates a owncloud server for gnome-online-accounts.
# It just redirects the DAV discovery to fastmail :D

from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.requests import Request
from starlette.responses import Response, RedirectResponse


async def homepage(request: Request):
    return Response()


async def dav(request: Request):
    mapping = {
        "caldav": "https://caldav.fastmail.com/dav/calendars",
        "carddav": "https://carddav.fastmail.com/dav/addressbooks",
    }
    return RedirectResponse(mapping[request.path_params["type"]])


app = Starlette(
    debug=True,
    routes=[
        Route("/.well-known/{type}", dav, methods=["PROPFIND"]),
        Mount(
            "/remote.php",
            routes=[
                Route("/webdav/", homepage),
                Route("/{type}/", dav, methods=["PROPFIND"]),
            ],
        ),
    ],
)
