import React, { useState } from 'react';
import { List, Button, Switch, Spin } from 'antd';

import verifyRolesUser from './verifyRolesUser';
import { set, StructFormat } from 'util/stateHandler/struct';
import { Roles } from 'graphql/generated';

interface Role {
  roleID: Roles;
  description: string;
}

interface RolesFormProperties {
  roles: Role[];
  userRoles: Role[];
  onSave: (roles: StructFormat<boolean>) => void;
  loading: boolean;
}

const UserRolesForm: React.FC<RolesFormProperties> = ({
  roles,
  userRoles,
  onSave,
  loading,
}) => {
  const defaultState = userRoles.reduce((ac, a) => ({ ...ac, [a.roleID]: true }), {}) ?? {};
  const [rolesStatus, setRolesStatus] = useState<StructFormat<boolean>>(defaultState);
  return (
    <Spin spinning={loading}>
      <List
        style={{ marginBottom: 20 }}
        itemLayout='horizontal'
        dataSource={roles}
        renderItem={(role) => (
          <List.Item
            actions={[<Switch
              defaultChecked={verifyRolesUser(userRoles, role.roleID)}
              onChange={(checked) => setRolesStatus(
                (rolesStatus_) => set(rolesStatus_, role.roleID, checked),
              )}
            />]}
          >
            <List.Item.Meta
              title={role.roleID}
              description={role.description}
            />
          </List.Item>
        )}
      />
      <div style={{ textAlign: 'right' }}>
        <Button size='small' type='primary' onClick={() => onSave(rolesStatus)}>
          Submit
        </Button>
      </div>
    </Spin>
  );
};

export default UserRolesForm;