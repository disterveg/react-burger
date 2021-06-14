import React, { useEffect } from 'react';
import types from '../../utils/types';
import Ingredient from './ingredinet';
import { useInView } from 'react-intersection-observer';

const GroupIngredients = (props) => {
  const {
    elements, openModal, counter, index, setCurrent, containertRef,
  } = props;
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    root: containertRef.current,
  });

  useEffect(() => {
    if (inView) {
      setCurrent(entry.target.dataset.type);
    }
  }, [inView]);

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
            <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openModal} counter={counter} index={index} />
          ))
        }
      </div>
    </div>
  );
};

export default GroupIngredients;
