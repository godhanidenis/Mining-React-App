export const hashRateStatsTableColumns = [
  {
    name: 'name',
    title: 'HASHRATE STATS',
  },
  {
    name: 'value',
    title: '',
    align: 'right',
  }
];

export const difficultyStatsTableColumns = [
  {
    name: 'name',
    title: 'DIFFICULTY STATS',
  },
  {
    name: 'value',
    title: '',
    align: 'right',
  }
];

export const costToMineTableColumns = [
  {
    name: 'hardwareModel',
    title: 'Hardware Model',
    info: 'Click the name of the ASIC to see a more detailed chart of its stats and profitability.',
    align: 'center',
  },
  {
    name: 'electricityPrice',
    title: 'Break-Even\nElectricity Price',
    info: 'The maximum electricity price at which you do not lose money operating the given ASIC with stock firmware.',
  },
  {
    name: 'dpStockFirmware',
    title: 'Daily Profit\n(Stock Firmware)',
    info: 'The fiat profit earned per day if running on stock firmware with the user input electricity price.',
  },
  {
    name: 'dpBrainOS',
    title: 'Daily Profit\n(Braiins OS+)',
    info: 'The fiat profit earned per day if running on Braiins OS+ autotuning firmware with overclocking settings (maximum hashrate) and the user input electricity price.',
  },
  {
    name: 'dailyBtcMined',
    title: 'Daily BTC Mined',
    info: 'The amount of BTC mined per day with the given ASIC running on stock firmware at the current network difficulty.',
  },
  {
    name: 'profitability',
    title: 'Profitability',
    info: 'Profitability.'
  }
];


export const profitabilityToolTipContent = [
  {
      title: '-₿₿₿',
      color: '#a2171f'
  },
  {
      title: '-₿',
      color: '#f95355'
  },
  {
      title: '₿',
      color: '#EB6307'
  },
  {
      title: '₿₿₿',
      color: '#ffff00'
  },
  {
      title: '₿₿₿₿₿',
      color: '#5adf88'
  },
  {
      title: '₿₿₿₿₿₿₿',
      color: '#13a454'
  }];