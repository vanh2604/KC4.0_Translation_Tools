from sanic import Blueprint
from infrastructure.configs import GlobalConfig, get_cnf
from modules.user.queries.me.http_controller import GetMe
from modules.user.queries.get_list.http_controller import GetList
from modules.user.commands.auth.http_controller import Auth
from modules.user.commands.logout.http_controller import Logout
from modules.user.commands.update_self.http_controller import UpdateSelf
from modules.user.commands.update_other.http_controller import UpdateOther

config: GlobalConfig = get_cnf()

APP_CONFIG = config.APP_CONFIG

user_bp = Blueprint(
    APP_CONFIG.ROUTES['user']['name'], 
    url_prefix=APP_CONFIG.ROUTES['user']['path']
)

user_bp.add_route(
    GetMe.as_view(), 
    uri=APP_CONFIG.ROUTES['user.me']['path'],
    methods=[APP_CONFIG.ROUTES['user.me']['method']]
)

user_bp.add_route(
    Auth.as_view(), 
    uri=APP_CONFIG.ROUTES['user.auth']['path'],
    methods=[APP_CONFIG.ROUTES['user.auth']['method']]
)

user_bp.add_route(
    Logout.as_view(), 
    uri=APP_CONFIG.ROUTES['user.logout']['path'],
    methods=[APP_CONFIG.ROUTES['user.logout']['method']]
)

user_bp.add_route(
    UpdateSelf.as_view(), 
    uri=APP_CONFIG.ROUTES['user.update_self']['path'],
    methods=[APP_CONFIG.ROUTES['user.update_self']['method']]
)

user_bp.add_route(
    UpdateOther.as_view(), 
    uri=APP_CONFIG.ROUTES['user.update_other']['path'],
    methods=[APP_CONFIG.ROUTES['user.update_other']['method']]
)

user_bp.add_route(
    GetList.as_view(), 
    uri=APP_CONFIG.ROUTES['user.get_list']['path'],
    methods=[APP_CONFIG.ROUTES['user.get_list']['method']]
)
