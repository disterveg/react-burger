import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

const Tabs = ({ handleTabClick, tabs, current }: {handleTabClick: (tab: string) => void, tabs: {bun: string, main: string, sauce: string}, current: string}) => {
  return (
  <div className={styles.tabs}>
    {Object.values(tabs).map((name, key) => (
      <Tab
        value={Object.keys(tabs)[key]}
        active={current === Object.keys(tabs)[key]}
        key={Object.keys(tabs)[key]}
        onClick={handleTabClick}
      >
        {name}
      </Tab>
    ))}
  </div>
)};

export default Tabs;
