import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import styles from "./css/crm.module.css";
import {
    Button,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from '@mui/icons-material/Upload';
import { fetchData } from "../utility";
import SimpleTable from "./EmployeesTable";
import BasicTable from "./BasicTable";
import { useAdmin } from "../context/Admin";

export interface Employees {
  employees: Employee[];
  setEmployees: (employee: Employee[]) => void;
}

interface Employee {
  [key: string]: string | number;
}

interface ResponseInterface {
  data: {[key: string]: string | number}[];
}

export default function CRMTab() {
  const [search, setSearch] = useState<string>("");
  const [employees, setEmployees] = useState<Employees>([]);
  const fileInputRef = useRef(null);
  const {admin} = useAdmin();

  useEffect(() => {
    fetchEmployees();
  }, [admin]);
  
  async function fetchEmployees() {
    try {
      if(admin){
        const res = await fetchData(`/api/admin?adminId=${admin.id}`, 'GET');
        setEmployees(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e: BaseSyntheticEvent) {
    setSearch(e.target.value);
  }

  function handleUpload() {
      if(fileInputRef.current){
        fileInputRef.current.click();
    }
  }

  function handleFileChange(e: BaseSyntheticEvent) {
    uploadData(e.target.files[0]);
  }

  async function uploadData(file: FormData){
    try {
      const formData = new FormData();
      formData.append('employees-data', file);
      const res = await fetchData(`/api/admin/upload?id=${admin?.id}`, 'POST', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id={styles.content}>
      <div id={styles.topContainer}>
        <form id={styles.form}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={search}
            onChange={handleChange}
            startAdornment={<SearchIcon className={styles.searchIcon}/>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
        <Button variant="contained" type="submit">Search</Button>
        </form>
        <Button onClick={handleUpload} startIcon={<UploadIcon />}>Upload File</Button>
        <input type="file" onChange={handleFileChange} name="employees" id="fileInput" ref={fileInputRef} hidden={true}/>
        {/* <SimpleTable employees={employees}/> */}
        {employees.length > 0 && <BasicTable employees={employees}/>}
      </div>
    </div>
  );
}
