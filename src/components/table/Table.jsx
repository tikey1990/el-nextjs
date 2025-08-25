import { useTable } from "react-table";
import PropTypes from "prop-types";

import "./styles/table.scss";

/**
 * Компонент таблицы на базе react-table
 *
 * @component
 * @param {object} props - Пропсы, передаваемые в компонент
 * @param {Array} props.columns - Массив столбцов таблицы
 * @param {Array} props.data - Данные для отображения в таблице
 * @param {boolean} props.isBlockLayout - Определяет тип представления (табличное или блочное)
 * @example
 * return (
 *  <Table
 *      columns={[
 *          {
 *              Header: 'Name',
 *              accessor: 'name',
 *          },
 *          {
 *              Header: 'Age',
 *              accessor: 'age',
 *          },
 *      ]}
 *      data={[
 *          {
 *              name: 'John',
 *              age: 30,
 *          },
 *          {
 *              name: 'Jane',
 *              age: 45,
 *          },
 *      ]}
 *      isBlockLayout={true}
 *  />
 * )
 */
export const Table = ({ isBlockLayout, columns, data }) => {
    // Используем react-table
    const { getTableBodyProps, getTableProps, headerGroups, prepareRow, rows } = useTable({ columns, data });

    const TableComponent = isBlockLayout ? "div" : "table";
    const HeadComponent = isBlockLayout ? "div" : "thead";
    const BodyComponent = isBlockLayout ? "div" : "tbody";
    const RowComponent = isBlockLayout ? "div" : "tr";
    const CellComponent = isBlockLayout ? "div" : "td";

    return (
        <div className="table__container">
            <TableComponent {...getTableProps()} className={isBlockLayout ? "table-block" : "table-default"}>
                <HeadComponent>
                    {Array.isArray(headerGroups) &&
                        headerGroups?.map((headerGroup, i) => (
                            <RowComponent {...headerGroup.getHeaderGroupProps()} key={i}>
                                {headerGroup.headers.map((column, i) => (
                                    <CellComponent {...column.getHeaderProps()} key={i}>
                                        {column.render("Header")}
                                    </CellComponent>
                                ))}
                            </RowComponent>
                        ))}
                </HeadComponent>
                <BodyComponent {...getTableBodyProps()}>
                    {Array.isArray(rows) &&
                        rows?.map((row, i) => {
                            prepareRow(row);
                            return (
                                <RowComponent {...row.getRowProps()} key={i}>
                                    {row.cells.map((cell, i) => {
                                        return (
                                            <CellComponent {...cell.getCellProps()} key={i}>
                                                {cell.render("Cell")}
                                            </CellComponent>
                                        );
                                    })}
                                </RowComponent>
                            );
                        })}
                </BodyComponent>
            </TableComponent>
        </div>
    );
};

Table.propTypes = {
    /** Массив столбцов для таблицы */
    columns: PropTypes.array.isRequired,
    /** Данные для таблицы */
    data: PropTypes.array.isRequired,
    /** Определяет тип представления (табличное или блочное) */
    isBlockLayout: PropTypes.bool,
};

Table.defaultProps = {
    isBlockLayout: false,
};
