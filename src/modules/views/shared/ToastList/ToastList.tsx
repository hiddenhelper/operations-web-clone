import React, { memo } from 'react';
import { ToastType } from '../../../models/general';

import { useStyles } from './styles';

export interface IToastListProps {
  list: { _id: string; message: string; type: ToastType }[];
  maxLength?: number;
}

const ToastList = ({ list, maxLength = 3 }: IToastListProps) => {
  const classes = useStyles();
  const truncatedList = [...list]
    .reverse()
    .slice(0, maxLength)
    .reverse();
  return (
    <div key="ToastList" className={classes.container}>
      {truncatedList.map(item => (
        <div key={item._id} className={`${classes.toastItem} ${classes[item.type]}`}>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(ToastList);
