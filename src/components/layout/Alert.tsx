import React, { FC } from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { Alerts } from '../../state/reducers/alert';

interface Props {
  alerts: Alerts[];
}

export const FireAlerts: FC<Props> = ({ alerts }) => {
  const alertList = alerts.map((alert) => (
    <Alert id={alert.id} status={alert.alertType} w='auto'>
      <AlertIcon />
      <AlertDescription fontSize={[8, 10, 12]}>{alert.msg}</AlertDescription>
    </Alert>
  ));

  return <>{alertList}</>;
};
