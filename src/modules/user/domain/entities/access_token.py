from typing import List, get_args
from pydantic import Field
from core.base_classes.entity import BaseEntityProps
from pydantic.main import BaseModel
from core.base_classes import Entity
from core.value_objects import ID
from infrastructure.configs.access_token import Scope, TokenType, Platform

class AccessTokenProps(BaseModel):
    user_id: ID = Field()
    token_type: TokenType = Field()
    access_token: ID = Field()
    refresh_token: ID = Field()
    scope: list = Field(...)
    platform: Platform = Field(...)
    expires_in: int = Field(...)
    revoked: bool = Field(...)

    class Config:
        use_enum_values = True

class AccessTokenEntity(Entity[AccessTokenProps]):

    def __init__(self, props: AccessTokenProps) -> None:
        super().__init__(props)

    @property
    def props_klass(self):
        return get_args(self.__orig_bases__[0])[0]
