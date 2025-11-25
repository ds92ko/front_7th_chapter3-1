import React, { useEffect, useState } from 'react';
import type { Post } from '../../services/postService';
import type { User } from '../../services/userService';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

type TableRow = Record<string, string | number | boolean | null | undefined> & {
  id: number;
  [key: string]: string | number | boolean | null | undefined;
};

// 타입 가드 함수들
function isUser(row: TableRow | User): row is User {
  return 'username' in row && 'email' in row && 'role' in row;
}

function isPost(row: TableRow | Post): row is Post {
  return 'title' in row && 'content' in row && 'author' in row;
}

function getValue<T extends TableRow>(
  row: T,
  key: string
): string | number | boolean | null | undefined {
  return row[key];
}

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
interface TableProps<T = TableRow> {
  columns?: Column[];
  data?: T[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: T) => void;

  // 🚨 도메인 관심사 추가
  entityType?: 'user' | 'post';
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const Table = <T = TableRow>({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}: TableProps<T>): React.ReactElement => {
  const [tableData, setTableData] = useState<T[]>(data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = getValue(a, columnKey);
      const bVal = getValue(b, columnKey);

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = aVal === null || aVal === undefined ? '' : String(aVal);
      const bStr = bVal === null || bVal === undefined ? '' : String(bVal);

      return newDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter(row =>
          Object.values(row).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : tableData;

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const tableClasses = [
    'table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    hover && 'table-hover',
  ]
    .filter(Boolean)
    .join(' ');

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map(key => ({ key, header: key, width: undefined }))
      : []);

  // 🚨 Bad Practice: Table 컴포넌트가 도메인별 렌더링 로직을 알고 있음
  const renderCell = (row: T, columnKey: string): React.ReactNode => {
    const value = getValue(row, columnKey);

    // 도메인별 특수 렌더링
    if (entityType === 'user' && isUser(row)) {
      if (columnKey === 'role') {
        const role = row.role;
        if (role === 'admin' || role === 'moderator' || role === 'user') {
          return <Badge userRole={role} showIcon />;
        }
      }
      if (columnKey === 'status') {
        const status = row.status;
        // User status를 Badge status로 변환
        const badgeStatus =
          status === 'active' ? 'published' : status === 'inactive' ? 'draft' : 'rejected';
        return <Badge status={badgeStatus} showIcon />;
      }
      if (columnKey === 'lastLogin') {
        return row.lastLogin || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post' && isPost(row)) {
      if (columnKey === 'category') {
        const category = row.category;
        const type =
          category === 'development'
            ? 'primary'
            : category === 'design'
              ? 'info'
              : category === 'accessibility'
                ? 'danger'
                : 'secondary';
        return (
          <Badge type={type} pill>
            {category}
          </Badge>
        );
      }
      if (columnKey === 'status') {
        const status = row.status;
        if (status === 'draft' || status === 'published' || status === 'archived') {
          return <Badge status={status} showIcon />;
        }
      }
      if (columnKey === 'views') {
        return row.views.toLocaleString();
      }
      if (columnKey === 'actions') {
        const status = row.status;
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {status === 'draft' && (
              <Button size="sm" variant="success" onClick={() => onPublish?.(row.id)}>
                게시
              </Button>
            )}
            {status === 'published' && (
              <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
                보관
              </Button>
            )}
            {status === 'archived' && (
              <Button size="sm" variant="primary" onClick={() => onRestore?.(row.id)}>
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    // 기본값을 문자열로 변환
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }

    return String(value);
  };

  return (
    <div className="table-container">
      {searchable && (
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '300px',
            }}
          />
        </div>
      )}

      <table className={tableClasses}>
        <thead>
          <tr>
            {actualColumns.map(column => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: sortable ? 'pointer' : 'default',
                  }}
                >
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {actualColumns.map(column => {
                const cellValue = row[column.key];
                return (
                  <td key={column.key}>
                    {entityType
                      ? renderCell(row, column.key)
                      : React.isValidElement(cellValue)
                        ? cellValue
                        : String(cellValue ?? '')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              background: 'white',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            이전
          </button>
          <span style={{ padding: '6px 12px' }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              background: 'white',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
