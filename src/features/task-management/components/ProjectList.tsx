'use client';

import { IProject } from '@/features/task-management/types/project';
import { DEFAULT_PAGE_SIZE } from '@/shared/constant';
import usePagination from '@/shared/hooks/usePagination';
import { formatDateWithTimezoneClient } from '@/shared/utils/date';
import { Flex, Table, Typography, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

const { Text } = Typography;
interface ProjectListProps {
  loading: boolean;
  projects: IProject[];
  totalItems: number;
}
function ProjectList({ projects, loading, totalItems }: ProjectListProps) {
  const {
    token: { padding },
  } = theme.useToken();
  const { current, simple, onChange, hideOnSinglePage, showSizeChanger } = usePagination();

  const columns: ColumnsType<IProject> = useMemo(() => {
    return [
      {
        title: 'Project',
        dataIndex: 'name',
        key: 'name',
        onCell: () => ({
          style: {
            width: '25%',
            minWidth: 132,
          },
        }),
        render: (_, record) => {
          return (
            <Flex gap={padding}>
              <Text>{record.icon}</Text>
              <Text>{record.name}</Text>
            </Flex>
          );
        },
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        onCell: () => ({
          style: {
            width: '15%',
            minWidth: 112,
          },
        }),
        render: (_, { author }) => {
          return (
            <Flex>
              <Text>{author.fullName}</Text>
            </Flex>
          );
        },
      },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        onCell: () => ({
          style: {
            width: '15%',
            minWidth: 112,
          },
        }),
        render: (date: Date) => {
          if (!date) {
            return 'N/A';
          }

          return formatDateWithTimezoneClient(date);
        },
      },
      {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        onCell: () => ({
          style: {
            width: '15%',
            minWidth: 96,
          },
        }),
        render: (_, record) => {
          return <Text type="secondary">Edit</Text>;
        },
      },
    ];
  }, []);
  return (
    <Table
      rowKey={(row) => row.id}
      bordered
      loading={loading}
      columns={columns}
      dataSource={projects}
      scroll={{ x: 432 }}
      pagination={{
        pageSize: DEFAULT_PAGE_SIZE,
        total: totalItems,
        current,
        simple,
        hideOnSinglePage,
        showSizeChanger,
        onChange,
      }}
    ></Table>
  );
}

export default ProjectList;
