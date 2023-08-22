import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../../Components/Admin/DashboardHeader';
import all_teachers from '../../../constants/teachers';
import {calculateRange, sliceData} from '../../../utils/table-pagination';
import { Link } from 'react-router-dom';

function Teachers () {
    const [search, setSearch] = useState('');
    const [teachers, setTeachers] = useState(all_teachers);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        setPagination(calculateRange(all_teachers, 6));
        setTeachers(sliceData(all_teachers, page, 6));
    }, []);

    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = teachers.filter((item) =>
                item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                item.lastName.toLowerCase().includes(search.toLowerCase())
            );
            setTeachers(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setTeachers(sliceData(all_teachers, new_page, 5));
    }

    return(
        <div className='dashboard-content'>
            <DashboardHeader/>
            <Link className='btn btn-primary' to="/admin/agregar-profesor">Agregar profesor</Link>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Profesores</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Verificado</th>
                            <th>Categoría</th>
                            <th>C. Likes</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    {teachers.length !== 0 ?
                        <tbody>
                            {teachers.map((teacher, index) => (
                                <tr key={index}>
                                    <td><span>{teacher.firstName} {teacher.lastName}</span></td>
                                    <td><span>{teacher.identityVerified ? 'Yes' : 'No'}</span></td>
                                    <td><span>{teacher.providerCategoryId}</span></td>
                                    <td><span>{teacher.totalLikes}</span></td>
                                    <td><span>Eliminar</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {teachers.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Teachers;