import { CardProps } from '../../atoms/Card/Card.types';

export interface CardSliderProps {
  items: Omit<CardProps, 'className'>[];
}