import React, { SetStateAction, useEffect } from 'react';
import { types } from '../../utils/mapping';
import Ingredient from './ingredinet';
import { IIngredient, TBunType } from '../../services/types/data';
import { useInView } from 'react-intersection-observer';

const GroupIngredients = (props: { elements: Array<IIngredient>; counter: (id: string, group: string) => number; index: TBunType; setCurrent: React.Dispatch<SetStateAction<string>>; containertRef: React.RefObject<HTMLDivElement> }) => {
  const {
    elements, counter, index, setCurrent, containertRef,
  } = props;
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    root: containertRef.current,
  });

  useEffect(() => {
    if (inView && entry) {
      const section = entry.target.getAttribute('data-type');
      if (section) {
        setCurrent(section);
      }
    }
  }, [inView, setCurrent, entry]);

  return (
    <div
      data-type={index}
      ref={ref}
      className="mt-8 mb-8"
      id={index}
      key={index}
    >
      <h2 className="text">{types[index]}</h2>
      <div className="d-flex flex-wrap">
        {
          elements.map((ingredient) => (
            <Ingredient key={ingredient._id} ingredient={ingredient} counter={counter} index={index} />
          ))
        }
      </div>
    </div>
  );
};

export default GroupIngredients;
