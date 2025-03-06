import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useSelector } from 'react-redux';
import { useEmployees } from '../context/Employees';

export default function EmployeesTablePaginationDemo() {
  const allEmployees = useSelector((state) => state.employees);
  const { employees, setEmployees } = useEmployees();
  
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);

  React.useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedEmployees = allEmployees.slice(startIndex, endIndex);
    setEmployees(paginatedEmployees);
  }, [page, rowsPerPage, allEmployees, setEmployees]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <TablePagination
        component="div"
        count={allEmployees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  );
}
