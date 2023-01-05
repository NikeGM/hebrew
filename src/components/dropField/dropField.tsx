import type { FC } from 'react';
import { useDrop } from 'react-dnd';
import styles from './dropField.module.css';

interface IDropFiledProps {
  name: string;
}

export const DropField: FC<IDropFiledProps> = ({ name }: IDropFiledProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const isActive = canDrop && isOver;

  return (
    <div ref={drop} className={styles.Container}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
};
