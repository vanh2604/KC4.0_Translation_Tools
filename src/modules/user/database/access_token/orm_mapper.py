from core.value_objects import ID
from typing import Any, get_args
from infrastructure.database.base_classes.mongodb.orm_mapper_base import OrmMapperBase

from modules.user.database.access_token.orm_entity import AccessTokenOrmEntity
from modules.user.domain.entities.access_token import AccessTokenEntity, AccessTokenProps

class AccessTokenOrmMapper(OrmMapperBase[AccessTokenEntity, AccessTokenOrmEntity]):

    @property
    def entity_klass(self):
        return get_args(self.__orig_bases__[0])[0]

    @property
    def orm_entity_klass(self):
        return get_args(self.__orig_bases__[0])[1]

    def to_orm_props(self, entity: AccessTokenEntity) -> Any:
        
        props = entity.get_props_copy()

        orm_props = {
            'user_id': props.user_id.value,
            'token_type': props.token_type,
            'access_token': props.access_token.value,
            'refresh_token': props.refresh_token.value,
            'scope': props.scope,
            'expires_in': props.expires_in,
            'platform': props.platform,
            'revoked': props.revoked
        }

        return orm_props

    def to_domain_props(self, orm_entity: AccessTokenOrmEntity) -> AccessTokenProps:
        
        props = {
            'user_id': ID(str(orm_entity.user_id)),
            'token_type': orm_entity.token_type,
            'access_token': ID(str(orm_entity.access_token)),
            'refresh_token': ID(str(orm_entity.refresh_token)),
            'scope': orm_entity.scope,
            'expires_in': orm_entity.expires_in,
            'platform': orm_entity.platform,
            'revoked': orm_entity.revoked
        }

        return props