import React from 'react';

import TelegramSvgIcon from '../assets/img/telegram.svg';
import TwitterSvgIcon from '../assets/img/twitter.svg';
import YoutubeSvgIcon from '../assets/img/youtube.svg';
import GithubSvgIcon from '../assets/img/github.svg';
import WechatSvgIcon from '../assets/img/wechat.svg';

export * from './table';

export const siteList = [
  { 
    title: 'Braiins.com',
    link: 'https://braiins.com',
  },
  { 
    title: 'Slush Pool',
    link: 'https://slushpool.com',
  },
  { 
    title: 'Braiins OS+',
    link: 'https://braiins-os.com/plus',
  },
  { 
    title: 'Braiins OS',
    link: 'https://braiins-os.com/open-source',
  },
  { 
    title: 'Stratum V2',
    link: 'https://braiins.com/bitcoin-mining-stack-upgrade',
  },
  { 
    title: 'Mining Insights',
    link: '#',
  },
];

export const navMenuItems = [
  {
    title: 'HOME',
    link: '/',
  },
  {
    title: 'NEWS',
    link: 'https://braiins.com/category/bitcoin-mining-insights',
  },
  {
    title: 'PROFITABILITY CALCULATOR',
    link: '/profitability-calculator',
  },
  {
    title: 'COST TO MINE',
    link: '/cost-to-mine',
  },
];

export const socialLinks = [
  {
    name: 'telegram',
    link: 'https://t.me/BraiinsOS',
    icon: <img src={TelegramSvgIcon} alt=""/>
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/slush_pool',
    icon: <img src={TwitterSvgIcon} alt=""/>
  },
  {
    name: 'youtube',
    link: 'https://www.youtube.com/channel/UClUiH7v_yj0SNpda99s9_tQ/featured',
    icon: <img src={YoutubeSvgIcon} alt=""/>
  },
  {
    name: 'github',
    link: 'https://github.com/braiins/braiins',
    icon: <img src={GithubSvgIcon} alt=""/>
  },
  {
    name: 'wechat',
    link: '#',
    icon: <img src={WechatSvgIcon} alt=""/>
  },
];

export const isEmbedCostToMine = (pathname) =>
    pathname === '/embed/cost-to-mine'
    || pathname === '/embed/es/cost-to-mine'
    || pathname === '/embed/zh/cost-to-mine'
    || pathname === '/embed/ru/cost-to-mine'
    || pathname === '/embed/fa/cost-to-mine';

export const isEmbedProfitabilityCalculator = (pathname) =>
    pathname === '/embed/profitability-calculator'
    || pathname === '/embed/es/profitability-calculator'
    || pathname === '/embed/zh/profitability-calculator'
    || pathname === '/embed/ru/profitability-calculator'
    || pathname === '/embed/fa/profitability-calculator';    

export const isCostToMine = (pathname) => pathname === '/cost-to-mine' || isEmbedCostToMine(pathname);

export const isProfitabilityCalculator = (pathname) => pathname === '/profitability-calculator' || isEmbedProfitabilityCalculator(pathname);

export const isEmbed = (pathname) => isEmbedCostToMine(pathname) || isEmbedProfitabilityCalculator(pathname);

export const embedLanguages = [
  {
    value: 'en',
    label: 'EN',
  },
  {
    value: 'es',
    label: 'ES',
  },
  {
    value: 'ru',
    label: 'RU',
  },
  {
    value: 'fa',
    label: 'FA',
  },
  {
    value: 'zh',
    label: 'ZH',
  }
];