import { Table } from 'antd';
import { ReactElement } from 'react';
import { tableColumns } from './LeaderBoard.constants';
import { dataSourceMock } from './mocks';

export const LeaderBoard = (): ReactElement => {
  const dataWithRanks = dataSourceMock.map((item, index) => ({
    ...item,
    position: index + 1,
    key: index,
  }));

  return <Table columns={tableColumns} dataSource={dataWithRanks} pagination={false} />;
};
